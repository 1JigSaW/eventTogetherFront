import React from 'react';
import {Image, Text, View} from 'react-native';

const UserCard = ({user}: any) => (
  <View>
    <Image
      source={{uri: user.profilePicture}}
      style={{width: '100%', height: 300}}
    />
    <Text>
      {user.firstName} {user.lastName}
    </Text>
    <Text>Age: {user.age}</Text>
    <Text>Interests: {user.interests && user.interests.join(', ')}</Text>
    <Text>Languages: {user.languages && user.languages.join(', ')}</Text>
  </View>
);

export default UserCard;
