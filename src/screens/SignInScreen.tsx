import React, {useContext, useEffect, useState} from 'react';
import {
  Animated,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {BLACK, BLUE, GRAY_1, GRAY_2, WHITE} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import View = Animated.View;
import {Bold, Regular, SemiBold} from '../../fonts';
import {useLoginUser} from '../queries/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER} from '../../constants';
import {UserContext} from '../../App';

type Props = StackScreenProps<HomeStackParamList, 'SignInScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {setUser} = useContext(UserContext);

  const loginUserMutation = useLoginUser();

  function handleSendData() {
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters long');
      return;
    }

    setErrorMessage(null);
    loginUserMutation.mutate(
      {email, password},
      {
        onError: error => {
          setErrorMessage(error?.response?.data.message || error.message);
        },
      },
    );
  }

  useEffect(() => {
    if (loginUserMutation.isSuccess && loginUserMutation.data) {
      try {
        AsyncStorage.setItem(USER, loginUserMutation.data.userId.toString());
        setUser(loginUserMutation.data.userId);
        // navigation.navigate('HomeScreen');
      } catch (e: any) {
        setErrorMessage(e);
      }
    }
  }, [
    loginUserMutation.isSuccess,
    loginUserMutation.data,
    navigation,
    setUser,
  ]);

  const handleModalClose = () => {
    setErrorMessage(null); // Clear error message
  };

  const validateEmail = (email: string) => {
    let re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

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
          <Text style={styles.titleSignIn}>Sign In</Text>
          <TextInput
            style={[styles.textInputEmail]}
            placeholder="Email"
            placeholderTextColor={GRAY_1}
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <TextInput
            style={[styles.textInputOther]}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            placeholderTextColor={GRAY_1}
            secureTextEntry={true}
          />
          <Pressable
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>
          <Pressable
            style={[
              styles.buttonCreate,
              !(email && password) && {
                opacity: 0.2,
              },
            ]}
            onPress={handleSendData}
            disabled={!(email && password)}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.additionButton}>Create account</Text>
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
  titleSignIn: {
    fontFamily: Bold,
    fontSize: 36,
    lineHeight: 42,
    color: WHITE,
  },
  textInputEmail: {
    backgroundColor: GRAY_2,
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
    borderColor: GRAY_1,
  },
  placeholder: {
    fontFamily: Regular,
    fontSize: 24,
    lineHeight: 28,
    color: GRAY_1,
  },
  textInputOther: {
    backgroundColor: GRAY_2,
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
    color: BLACK,
  },
  additionButton: {
    fontFamily: SemiBold,
    fontSize: 18,
    lineHeight: 21,
    color: BLUE,
    marginTop: 12,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  forgotPasswordText: {
    color: WHITE,
    fontFamily: SemiBold,
    fontSize: 14,
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
    shadowColor: WHITE,
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

export default SignInScreen;
