import React, {useContext, useEffect, useState} from 'react';
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
  BLACK,
  BLACK_MAIN,
  BLUE,
  GRAY_1,
  GRAY_2,
  GRAY_MAIN,
  WHITE,
} from '../../colors';
import {Bold, Regular, SemiBold} from '../../fonts';
import {useCreateUser} from '../queries/user';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../constants';
import {UserContext} from '../../App';

type Props = StackScreenProps<HomeStackParamList, 'SignUpScreen'>;

const SignUpScreen = ({navigation}: Props) => {
  const {setUser} = useContext(UserContext);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  }, [navigation, setUser]);

  const validateEmail = (email: string) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSendData = () => {
    setIsLoginTouched(true);
    setIsEmailTouched(true);
    setIsPasswordTouched(true);
    setIsRepeatPasswordTouched(true);

    if (!login) {
      setErrorMessage('Please provide a username');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage(null);
    createUserMutation.mutate(
      {username: login, email: email, password: password},
      {
        onSuccess: async data => {
          console.log(data);
          if (data.id) {
            console.log(data.id);
            setUser(data.id);
            await AsyncStorage.setItem(USER, JSON.stringify(data.id));
            setUser(data.id);
          }
        },
        onError: error => {
          if (error.response && error.response.status === 400) {
            let errorMessage = 'Something went wrong.';
            if (error.response.data.username) {
              errorMessage = error.response.data.username.join(' ');
            }
            if (error.response.data.email) {
              errorMessage = error.response.data.email.join(' ');
            }
            setErrorMessage(errorMessage);
          } else {
            setErrorMessage(error.message);
          }
        },
      },
    );
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
            placeholderTextColor={GRAY_1}
            onChangeText={text => {
              setLogin(text);
              setIsLoginTouched(true);
            }}
            value={login}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Email"
            placeholderTextColor={GRAY_1}
            onChangeText={text => {
              setEmail(text);
              setIsEmailTouched(true);
            }}
            value={email}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Password"
            placeholderTextColor={GRAY_1}
            onChangeText={text => {
              setPassword(text);
              setIsPasswordTouched(true);
            }}
            value={password}
            secureTextEntry={true}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Repeat password"
            placeholderTextColor={GRAY_1}
            onChangeText={text => {
              setRepeatPassword(text);
              setIsRepeatPasswordTouched(true);
            }}
            value={repeatPassword}
            secureTextEntry={true}
          />
          <Pressable
            style={[
              styles.buttonCreate,
              !(login && email && password && repeatPassword) && {
                opacity: 0.2,
              },
            ]}
            onPress={handleSendData}
            disabled={!(login && email && password && repeatPassword)}>
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
    backgroundColor: BLACK,
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
    backgroundColor: BLACK,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    padding: 10,
    borderColor: GRAY_1,
  },
  titleSignUp: {
    fontFamily: Bold,
    fontSize: 36,
    lineHeight: 42,
    color: WHITE,
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
    color: WHITE,
    backgroundColor: GRAY_2,
    borderColor: GRAY_1,
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
    color: WHITE,
    backgroundColor: GRAY_2,
    borderColor: GRAY_1,
  },
  buttonCreate: {
    marginTop: 41,
    borderWidth: 1,
    width: '97%',
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: BLUE,
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
    color: BLUE,
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
