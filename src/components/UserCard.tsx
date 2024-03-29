import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import { BLACK, BLACK_MAIN, BLUE, GRAY_1, ORANGE_MAIN, WHITE, WHITE_MAIN } from "../../colors";
import {Regular} from '../../fonts';
import LanguageIcon from './icons/LanguageIcon';
import BirthIcon from './icons/BirthIcon';
import StarIcon from './icons/StarIcon';
import DescriptionIcon from './icons/DescriptionIcon';

const UserCard = ({user}: any) => (
  <View style={styles.userBlock}>
    {user.image && (
      <Image
        source={{
          uri: user.image
            ? user.image
                .replace('http://', 'https://')
                .replace('image/upload/', '')
            : null,
        }}
        style={{
          width: 160,
          height: 160,
          borderRadius: 125,
          alignSelf: 'center',
          marginTop: 5,
          marginBottom: 5,
        }}
      />
    )}
    <Text style={styles.firstNameText}>{user.first_name}</Text>
    <Text style={styles.firstNameText}>{user.last_name}</Text>
    <View style={styles.insideBlock}>
      <View style={styles.row}>
        <LanguageIcon size={100} color={WHITE} />
        <Text style={styles.insideText}>
          {user.language && user.language.join(', ')}
        </Text>
      </View>
      <View style={[styles.row, {marginTop: 14}]}>
        <BirthIcon size={100} color={WHITE} />
        <Text style={styles.insideText}>{user.age}</Text>
      </View>
      <View style={[styles.row, {marginTop: 14}]}>
        <StarIcon size={100} style={{marginRight: 13}} color={WHITE} />
        {user.interests.map((item: string, index: number) => (
          <View style={styles.interests}>
            <Text
              key={index}
              style={[styles.insideText, {marginLeft: 0, color: BLACK}]}>
              {item}
            </Text>
          </View>
        ))}
      </View>
      {user.description && (
        <View style={[styles.row, {marginTop: 14}]}>
          <DescriptionIcon size={100} color={WHITE} />
          <Text style={styles.insideText}>
            {user.description}
          </Text>
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  userBlock: {
    backgroundColor: BLACK,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GRAY_1,
  },
  firstNameText: {
    alignSelf: 'center',
    fontSize: 32,
    color: WHITE,
    fontFamily: Regular,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insideText: {
    marginLeft: 13,
    color: WHITE,
    fontFamily: Regular,
    fontSize: 24,
  },
  insideBlock: {
    paddingTop: 37,
    paddingBottom: 20,
    paddingHorizontal: 22,
  },
  interests: {
    backgroundColor: BLUE,
    borderRadius: 15,
    marginRight: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});

export default UserCard;
