import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {Animated, StyleSheet} from 'react-native';
import {BACKGROUND_MAIN} from '../../colors';
import React from 'react';
import View = Animated.View;

type Props = StackScreenProps<HomeStackParamList, 'FavouritesScreen'>;

const FavouritesScreen = ({navigation}: Props) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
  },
});

export default FavouritesScreen;
