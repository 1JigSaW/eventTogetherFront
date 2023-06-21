import React, {useState} from 'react';
import {useCreateUser} from '../queries/user';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {BACKGROUND_MAIN} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  return <SafeAreaView style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
  },
});

export default HomeScreen;
