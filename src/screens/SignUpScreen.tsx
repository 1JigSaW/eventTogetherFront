import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import View = Animated.View;
import {
  BACKGROUND_MAIN,
  BLACK_MAIN,
  BLUE_MAIN,
  GRAY_MAIN,
  WHITE_MAIN,
} from '../../colors';
import {Bold, Regular, SemiBold} from '../../fonts';
import {useCreateUser} from '../queries/user';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../constants';
import { UserContext } from "../../App";

type Props = StackScreenProps<HomeStackParamList, 'SignUpScreen'>;

const SignUpScreen = ({navigation}: Props) => {
  const {setUser} = useContext(UserContext);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isLoginTouched, setIsLoginTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isRepeatPasswordTouched, setIsRepeatPasswordTouched] = useState(false);

  const createUserMutation = useCreateUser();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem(USER);
      if (user != null) {
        navigation.navigate('HomeScreen');
      } else {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigation]);

  const handleSendData = () => {
    setIsLoginTouched(true);
    setIsEmailTouched(true);
    setIsPasswordTouched(true);
    setIsRepeatPasswordTouched(true);

    if (
      login &&
      email &&
      password &&
      repeatPassword &&
      password === repeatPassword
    ) {
      createUserMutation.mutate(
        {username: login, email: email, password: password},
        {
          onSuccess: async data => {
            try {
              // Сохраняем данные пользователя в AsyncStorage
              await AsyncStorage.setItem(USER, JSON.stringify(data));
              // setUser(data.user);
              navigation.navigate('HomeScreen');
            } catch (e) {
              console.error(e);
            }
          },
          onError: error => {
            setErrorMessage(error?.response?.data.email);
          },
        },
      );
    }
  };

  const handleModalClose = () => {
    setErrorMessage(null); // Clear error message
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={BLACK_MAIN} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!errorMessage}
        onRequestClose={handleModalClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleModalClose}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.content}>
        <View style={styles.centerBlock}>
          <Text style={styles.titleSignUp}>Sign Up</Text>
          <TextInput
            style={[styles.textInputLogin]}
            placeholder="Login"
            onChangeText={text => {
              setLogin(text);
              setIsLoginTouched(true);
            }}
            value={login}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Email"
            onChangeText={text => {
              setEmail(text);
              setIsEmailTouched(true);
            }}
            value={email}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Password"
            onChangeText={text => {
              setPassword(text);
              setIsPasswordTouched(true);
            }}
            value={password}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Repeat password"
            onChangeText={text => {
              setRepeatPassword(text);
              setIsRepeatPasswordTouched(true);
            }}
            value={repeatPassword}
          />
          <Pressable
            style={[
              styles.buttonCreate,
              !(login && email && password && repeatPassword) && {
                backgroundColor: GRAY_MAIN,
                opacity: 0.2,
              },
            ]}
            onPress={handleSendData}
            disabled={
              !(
                login &&
                email &&
                password &&
                repeatPassword &&
                password === repeatPassword
              )
            }>
            <Text style={styles.buttonText}>Create</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={styles.additionButton}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  centerBlock: {
    width: 335,
    backgroundColor: WHITE_MAIN,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
  },
  titleSignUp: {
    fontFamily: Bold,
    fontSize: 36,
    lineHeight: 42,
    color: BLACK_MAIN,
  },
  textInputLogin: {
    marginTop: 36,
    borderWidth: 1,
    width: '97%',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: Regular,
    fontSize: 24,
    lineHeight: 28,
    color: BLACK_MAIN,
  },
  placeholder: {
    fontFamily: Regular,
    fontSize: 24,
    lineHeight: 28,
    color: GRAY_MAIN,
  },
  textInputOther: {
    marginTop: 10,
    borderWidth: 1,
    width: '97%',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: Regular,
    fontSize: 24,
    lineHeight: 28,
    color: BLACK_MAIN,
  },
  buttonCreate: {
    marginTop: 41,
    borderWidth: 1,
    width: '97%',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: BLUE_MAIN,
    alignItems: 'center',
    opacity: 1,
  },
  buttonText: {
    fontFamily: SemiBold,
    fontSize: 24,
    lineHeight: 28,
    color: BLACK_MAIN,
  },
  additionButton: {
    fontFamily: SemiBold,
    fontSize: 18,
    lineHeight: 21,
    color: BLUE_MAIN,
    marginTop: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // This is the background color of the overlay
  },
  modalView: {
    width: '80%', // Set this to whatever size you want
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default SignUpScreen;
