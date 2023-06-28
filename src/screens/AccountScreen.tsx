import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {BACKGROUND_MAIN, BLACK_MAIN, BLUE_MAIN, WHITE_MAIN} from '../../colors';
import ProfileIcon from '../components/icons/ProfileIcon';
import {Bold, Regular} from '../../fonts';
import {useSearchInterests} from '../queries/interest';
import {useSearchLanguages} from '../queries/language';
import Autocomplete from 'react-native-autocomplete-input';

type Props = StackScreenProps<HomeStackParamList, 'AccountScreen'>;

const AccountScreen = ({navigation}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [interestQuery, setInterestQuery] = useState('');
  const [languageQuery, setLanguageQuery] = useState('');

  const {data: interests} = useSearchInterests(interestQuery);
  const {data: languages} = useSearchLanguages(languageQuery);
  console.log(languages);

  const handleSubmit = () => {
    console.log(2);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerFull}>
      <SafeAreaView style={styles.container}>
        <View style={styles.insideBlock}>
          <View style={styles.profileBlock}>
            <ProfileIcon size={450} />
          </View>
          <View>
            <Text style={styles.infoText}>Info:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Second Name"
              value={secondName}
              onChangeText={setSecondName}
            />
            <TextInput
              style={styles.textInput}
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
            <View>
              <Autocomplete
                style={styles.textInput}
                autoCorrect={false}
                data={languages ? languages : []}
                defaultValue={languageQuery}
                onChangeText={text => {
                  setLanguageQuery(text);
                }}
                placeholder={'Languages'}
                flatListProps={{
                  keyboardShouldPersistTaps: 'always',
                  keyExtractor: (_, idx) => 'key-' + idx,
                  renderItem: ({item}: any) => (
                    <TouchableOpacity
                      onPress={() => {
                        setLanguageQuery(item.name);
                      }}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  ),
                }}
              />
            </View>

          </View>
          <View style={styles.passwordBlock}>
            <Text style={styles.infoText}>Password:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Old password"
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            <TextInput
              style={styles.textInput}
              placeholder="New password"
              value={newPassword}
              onChangeText={setNewPassword}
            />
          </View>
        </View>
      </SafeAreaView>
      <Pressable style={styles.saveButtonBlock} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>Save</Text>
      </Pressable>
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
    marginBottom: 34,
    borderRadius: 15,
  },
  saveButtonText: {
    color: BLACK_MAIN,
    fontSize: 24,
    lineHeight: 47,
    fontFamily: Regular,
  },
});

export default AccountScreen;
