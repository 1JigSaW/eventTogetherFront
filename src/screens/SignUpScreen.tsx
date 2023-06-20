import React from 'react';
import {
  Animated,
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

const SignUpScreen = () => {
  const handleSendData = () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.centerBlock}>
          <Text style={styles.titleSignUp}>Sign Up</Text>
          <TextInput style={styles.textInputLogin} placeholder="Login" />
          <TextInput style={styles.textInputOther} placeholder="Email" />
          <TextInput style={styles.textInputOther} placeholder="Password" />
          <TextInput
            style={styles.textInputOther}
            placeholder="Repeat password"
          />
          <Pressable style={styles.buttonCreate} onPress={handleSendData}>
            <Text style={styles.buttonText}>Create</Text>
          </Pressable>
          <Text style={styles.additionButton}>Sign in</Text>
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
});

export default SignUpScreen;
