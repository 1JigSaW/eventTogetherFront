import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {
  Alert,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  BLACK,
  BLACK_MAIN,
  BLUE,
  GRAY_1,
  GRAY_2,
  GREEN_MAIN,
  RED_MAIN,
  WHITE,
} from '../../colors';
import {Bold, Regular} from '../../fonts';
import {useSearchInterests} from '../queries/interest';
import {CustomSelector} from '../components/CustomSelector';
import {useSearchLanguages} from '../queries/language';
import {
  useUpdateUserProfile,
  useUpdateUserProfilePicture,
  useUserProfileDetail,
} from '../queries/userprofile';
import {UserContext} from '../../App';
import {useChangePassword} from '../queries/user';
import {UserProfileData} from '../api/userprofile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COUNTRY, USER} from '../../constants';
import {
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import {
  Permission,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';
import LogoutIcon from '../components/icons/LogoutIcon';
import PeopleOneIcon from '../components/icons/PeopleOneIcon';
import Add2Icon from '../components/icons/Add2Icon';
import {useUniqueCountries} from '../queries/country';

type Props = StackScreenProps<HomeStackParamList, 'AccountScreen'>;

const AccountScreen = ({navigation}: Props) => {
  const {user, setUserProfileExist, setUserProfile, setUser, setCountry} =
    useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [firstNameValid, setFirstNameValid] = useState(true);
  const [secondNameValid, setSecondNameValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);
  const [languagesValid, setLanguagesValid] = useState(false);
  const [interestsValid, setInterestsValid] = useState(false);

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [secondNameTouched, setSecondNameTouched] = useState(false);
  const [ageTouched, setAgeTouched] = useState(false);
  const [languagesTouched, setLanguagesTouched] = useState(false);
  const [interestsTouched, setInterestsTouched] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [showUpdateProfileSuccess, setShowUpdateProfileSuccess] =
    useState(false);
  const [showChangePasswordSuccess, setShowChangePasswordSuccess] =
    useState(false);

  const [country, setCountryN] = useState('');
  const {data, isLoading, error} = useUniqueCountries();

  const [originalProfileData, setOriginalProfileData] =
    useState<UserProfileData | null>(null);

  const userProfileDetailQuery = useUserProfileDetail(user);
  const updateUserProfileMutation = useUpdateUserProfile();
  const changePasswordMutation = useChangePassword();
  const updateUserProfilePicture = useUpdateUserProfilePicture();

  const handleCountrySelect = async (selectedCountry: string) => {
    setCountryN(selectedCountry);
    setModalVisible(false);
    try {
      await AsyncStorage.setItem(COUNTRY, selectedCountry);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{marginLeft: 8}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>{country}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.listItem}
                    onPress={() => handleCountrySelect(item.country)}>
                    <Text style={styles.listItemText}>{item.country}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        </View>
      ),
      headerRight: () => (
        <Pressable style={styles.headerRight} onPress={handleLogout}>
          <LogoutIcon size={25} color={WHITE} />
        </Pressable>
      ),
    });
  }, [country, data, modalVisible, navigation]);

  useEffect(() => {
    if (updateUserProfileMutation.isSuccess) {
      setShowUpdateProfileSuccess(true);
      setTimeout(() => {
        setShowUpdateProfileSuccess(false);
      }, 3000);
    }
  }, [updateUserProfileMutation.isSuccess]);

  useEffect(() => {
    if (changePasswordMutation.isSuccess) {
      setShowChangePasswordSuccess(true);
      setTimeout(() => {
        setShowChangePasswordSuccess(false);
      }, 3000);
    }
  }, [changePasswordMutation.isSuccess]);

  useEffect(() => {
    const fetchCountry = async () => {
      const storedCountry = await AsyncStorage.getItem(COUNTRY);
      if (storedCountry) {
        setCountryN(storedCountry);
      }
    };

    fetchCountry();
  }, []);

  useEffect(() => {
    if (userProfileDetailQuery.data) {
      const profileData = userProfileDetailQuery.data;
      if (profileData.image) {
        let image_url = profileData.image.replace('image/upload/', '');
        setPhoto(image_url);
        console.log(image_url);
      }
      console.log(photo);
      setFirstName(profileData.first_name);
      setSecondName(profileData.last_name);
      setAge(String(profileData.age));
      setDescription(profileData.description || '');
      setSelectedLanguages(profileData.language);
      setSelectedInterests(profileData.interests);
      setOriginalProfileData(profileData);
    }
  }, [photo, userProfileDetailQuery.data]);

  const validateForm = () => {
    let valid = true;

    if (firstName === '') {
      setFirstNameValid(false);
      valid = false;
    } else {
      setFirstNameValid(true);
    }

    if (secondName === '') {
      setSecondNameValid(false);
      valid = false;
    } else {
      setSecondNameValid(true);
    }

    if (age === '') {
      setAgeValid(false);
      valid = false;
    } else {
      setAgeValid(true);
    }

    if (selectedLanguages.length === 0) {
      setLanguagesValid(false);
      valid = false;
    } else {
      setLanguagesValid(true);
    }

    if (selectedInterests.length === 0) {
      setInterestsValid(false);
      valid = false;
    } else {
      setInterestsValid(true);
    }

    return valid;
  };

  const hasDataChanged = () => {
    const currentData = {
      user: user,
      first_name: firstName,
      last_name: secondName,
      age: parseInt(age, 10),
      language: selectedLanguages,
      interests: selectedInterests,
      description,
    };
    return JSON.stringify(currentData) !== JSON.stringify(originalProfileData);
  };

  const handleSubmit = () => {
    setFirstNameTouched(true);
    setSecondNameTouched(true);
    setAgeTouched(true);
    setLanguagesTouched(true);
    setInterestsTouched(true);

    if (oldPassword && newPassword) {
      changePasswordMutation.mutate({oldPassword, newPassword, user});
      setNewPassword('');
      setOldPassword('');
    }

    if (validateForm() && hasDataChanged()) {
      const formData = {
        user: user,
        first_name: firstName,
        last_name: secondName,
        age: parseInt(age, 10),
        description,
        language: selectedLanguages,
        interests: selectedInterests,
      };

      updateUserProfileMutation.mutate(formData, {
        onSuccess: response => {
          setUserProfileExist(true);
          setUserProfile(response.user_profile_id);
        },
      });
    }
  };

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem(USER);
    setUser(null);
    setUserProfile(null);
    setUserProfileExist(false);
    setCountry(null);
  }, [setCountry, setUser, setUserProfile, setUserProfileExist]);

  const requestStoragePermission = async () => {
    try {
      let permission: Permission | undefined;
      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      }

      if (permission) {
        console.log('Requesting permission...');
        const result: PermissionStatus = await request(permission);
        console.log('Permission result:', result);

        if (result === 'granted') {
          pickImage();
        } else {
          Alert.alert(
            'Permission Required',
            'Please grant permission to access photo library.',
          );
        }
      }
    } catch (error) {
      console.error('handleOpenFromLibrary error:', error);
    }
  };

  const pickImage = async () => {
    try {
      let options = {
        mediaType: 'photo' as MediaType,
        includeBase64: true,
        maxWidth: 300,
        maxHeight: 300,
        quality: 1 as PhotoQuality,
      };
      await launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets[0].uri) {
          const source = {uri: response.assets[0].uri};
          setPickedImage(source.uri);
          updateUserProfilePicture.mutate({
            userProfileId: user,
            picture: response.assets[0].base64,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerFull}>
      <SafeAreaView style={styles.container}>
        {/*{userProfileDetailQuery.isLoading && (*/}
        {/*  <ActivityIndicator size="large" color="#0000ff" />*/}
        {/*)}*/}
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="always">
            {showUpdateProfileSuccess && (
              <Text style={styles.successSave}>
                Your profile has been successfully updated!
              </Text>
            )}
            {showChangePasswordSuccess && (
              <Text style={styles.successSave}>
                Your password has been successfully updated!
              </Text>
            )}
            <View style={styles.insideBlock}>
              <Pressable
                style={styles.profileBlock}
                onPress={requestStoragePermission}>
                {pickedImage ? (
                  <Image
                    source={{uri: pickedImage}}
                    style={{width: 100, height: 100, borderRadius: 125}}
                  />
                ) : photo ? (
                  <Image
                    source={{uri: photo}}
                    style={{width: 100, height: 100, borderRadius: 125}}
                  />
                ) : (
                  <View style={styles.iconBackgroundBig}>
                    <PeopleOneIcon size={48} />
                    <View style={styles.smallIconWrapper}>
                      <Add2Icon size={10} style={styles.smallIcon} />
                    </View>
                  </View>
                )}
              </Pressable>
              <View>
                <Text style={styles.infoText}>Info:</Text>
                <TextInput
                  style={[
                    styles.textInput,
                    firstNameTouched &&
                      !firstNameValid &&
                      firstName === '' &&
                      styles.error,
                  ]}
                  multiline={true}
                  placeholder="First Name"
                  placeholderTextColor={GRAY_1}
                  value={firstName}
                  onChangeText={text => {
                    setFirstName(text);
                    setFirstNameTouched(true);
                  }}
                />
                <TextInput
                  style={[
                    styles.textInput,
                    secondNameTouched &&
                      !secondNameValid &&
                      secondName === '' &&
                      styles.error,
                  ]}
                  multiline={true}
                  placeholder="Second Name"
                  placeholderTextColor={GRAY_1}
                  value={secondName}
                  onChangeText={text => {
                    setSecondName(text);
                    setSecondNameTouched(true);
                  }}
                />
                <CustomSelector
                  style={
                    !languagesValid &&
                    languagesTouched &&
                    selectedLanguages.length === 0
                      ? styles.error
                      : undefined
                  }
                  selectedItems={selectedLanguages}
                  onSelect={setSelectedLanguages}
                  useSearchItems={useSearchLanguages}
                  placeholder="Add language"
                />
                <CustomSelector
                  style={
                    !interestsValid &&
                    interestsTouched &&
                    selectedInterests.length === 0
                      ? styles.error
                      : undefined
                  }
                  selectedItems={selectedInterests}
                  onSelect={setSelectedInterests}
                  useSearchItems={useSearchInterests}
                  placeholder="Add hobby"
                />

                <TextInput
                  style={[
                    styles.textInput,
                    !ageValid && age === '' && styles.error,
                  ]}
                  multiline={true}
                  placeholder="Age"
                  placeholderTextColor={GRAY_1}
                  value={age}
                  onChangeText={setAge}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Description"
                  placeholderTextColor={GRAY_1}
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                />
              </View>
              <View style={styles.passwordBlock}>
                <Text style={styles.infoText}>Password:</Text>
                {changePasswordMutation.isError && (
                  <Text style={styles.errorText}>Enter correct password</Text>
                )}
                {/*{changePasswordMutation.isSuccess && (*/}
                {/*  <Text style={styles.successText}>Enter correct password</Text>*/}
                {/*)}*/}
                <TextInput
                  style={styles.textInput}
                  placeholder="Old password"
                  placeholderTextColor={GRAY_1}
                  value={oldPassword}
                  multiline={true}
                  onChangeText={setOldPassword}
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="New password"
                  placeholderTextColor={GRAY_1}
                  value={newPassword}
                  multiline={true}
                  onChangeText={setNewPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Pressable style={styles.saveButtonBlock} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerFull: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  profileBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  insideBlock: {
    marginHorizontal: 8,
  },
  // infoBlock: {
  //
  // },
  infoText: {
    fontSize: 24,
    color: BLUE,
    fontFamily: Bold,
  },
  successSave: {
    fontSize: 18,
    padding: 5,
    alignSelf: 'center',
    color: GREEN_MAIN,
  },
  textInput: {
    backgroundColor: GRAY_2,
    borderWidth: 1,
    borderColor: GRAY_1,
    marginTop: 8,
    borderRadius: 15,
    height: 32,
    paddingHorizontal: 10,
    fontSize: 16,
    color: WHITE,
    fontFamily: Regular,
    flex: 1,
  },
  passwordBlock: {
    marginTop: 50,
  },
  saveButtonBlock: {
    backgroundColor: BLUE,
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 14,
    marginTop: 10,
    borderRadius: 15,
  },
  saveButtonText: {
    color: BLACK_MAIN,
    fontSize: 24,
    lineHeight: 47,
    fontFamily: Regular,
  },
  error: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontFamily: Regular,
  },
  successText: {
    color: GREEN_MAIN,
    alignSelf: 'center',
    fontFamily: Regular,
  },
  logoutButtonBlock: {
    backgroundColor: RED_MAIN,
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 14,
    marginTop: 10,
    borderRadius: 15,
  },
  logoutButtonText: {
    fontFamily: Regular,
    fontSize: 16,
    lineHeight: 27,
    color: BLACK_MAIN,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 12,
  },
  iconBackgroundBig: {
    backgroundColor: BLUE,
    borderRadius: 100,
    padding: 15,
  },
  smallIconWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 5,
  },
  smallIcon: {
    // Возможные стили для маленькой иконки
  },
  button: {
    padding: 5,
    backgroundColor: BLUE,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: BLACK,
    textAlign: 'center',
    fontFamily: Regular,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: GRAY_2,
    padding: 10,
    marginTop: 70,
    borderRadius: 15,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 18,
    color: BLACK,
    textAlign: 'center',
    fontFamily: Regular,
  },
});

export default AccountScreen;
