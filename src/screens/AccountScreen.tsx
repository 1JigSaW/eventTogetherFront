import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  BACKGROUND_MAIN,
  BLACK_MAIN,
  BLUE_MAIN,
  GREEN_MAIN,
  RED_MAIN,
  WHITE_MAIN,
} from '../../colors';
import ProfileIcon from '../components/icons/ProfileIcon';
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
import {USER} from '../../constants';
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

type Props = StackScreenProps<HomeStackParamList, 'AccountScreen'>;

const AccountScreen = ({navigation}: Props) => {
  const {user, setUserProfileExist, setUserProfile, setUser} =
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

  const [originalProfileData, setOriginalProfileData] =
    useState<UserProfileData | null>(null);

  const userProfileDetailQuery = useUserProfileDetail(user);
  const updateUserProfileMutation = useUpdateUserProfile();
  const changePasswordMutation = useChangePassword();
  const updateUserProfilePicture = useUpdateUserProfilePicture();

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

  async function handleLogout() {
    await AsyncStorage.removeItem(USER);
    setUser(null);
    setUserProfile(null);
    setUserProfileExist(false);
    navigation.navigate('SignInScreen');
  }

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
            {updateUserProfileMutation.isSuccess && (
              <Text style={styles.successSave}>
                Your profile has been successfully updated!
              </Text>
            )}
            {changePasswordMutation.isSuccess && (
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
                    style={{width: 250, height: 250, borderRadius: 125}}
                  />
                ) : photo ? (
                  <Image
                    source={{uri: photo}}
                    style={{width: 250, height: 250, borderRadius: 125}}
                  />
                ) : (
                  <ProfileIcon size={250} />
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
                  placeholder="First Name"
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
                  placeholder="Second Name"
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
                  placeholder="Age"
                  value={age}
                  onChangeText={setAge}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                />
              </View>
              <View style={styles.passwordBlock}>
                <Text style={styles.infoText}>Password:</Text>
                {changePasswordMutation.isError && (
                  <Text style={styles.errorText}>Enter correct password</Text>
                )}
                {changePasswordMutation.isSuccess && (
                  <Text style={styles.successText}>Enter correct password</Text>
                )}
                <TextInput
                  style={styles.textInput}
                  placeholder="Old password"
                  value={oldPassword}
                  onChangeText={setOldPassword}
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="New password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Pressable style={styles.saveButtonBlock} onPress={handleSubmit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.logoutButtonBlock} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
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
    backgroundColor: BACKGROUND_MAIN,
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
    color: BLACK_MAIN,
    fontFamily: Bold,
  },
  successSave: {
    fontSize: 18,
    padding: 5,
    alignSelf: 'center',
    color: GREEN_MAIN,
  },
  textInput: {
    backgroundColor: WHITE_MAIN,
    marginTop: 8,
    borderRadius: 15,
    borderWidth: 1,
    lineHeight: 32,
    paddingHorizontal: 10,
    fontSize: 16,
    color: BLACK_MAIN,
    fontFamily: Regular,
    paddingVertical: 4,
  },
  passwordBlock: {
    marginTop: 50,
  },
  saveButtonBlock: {
    backgroundColor: BLUE_MAIN,
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
});

export default AccountScreen;
