import React, {useState} from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {BACKGROUND_MAIN, WHITE_MAIN} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {Regular} from '../../fonts';
import View = Animated.View;
import SearchIcon from '../components/icons/SearchIcon';

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insideBlock}>
        <View style={styles.searchContainer}>
          <SearchIcon size={100} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <View style={styles.whiteBlock} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: WHITE_MAIN,
    borderRadius: 15,
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  insideBlock: {
    marginHorizontal: 8,
  },
  searchInput: {
    fontSize: 18,
    fontFamily: Regular,
    paddingVertical: 0,
    marginLeft: 4,
    flex: 1,
  },
  whiteBlock: {
    borderRadius: 15,
    backgroundColor: WHITE_MAIN,
    borderWidth: 1,
    marginTop: 8,
  },
});

export default HomeScreen;
