import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import React, {useContext, useState} from 'react';
import {UserContext} from '../../App';
import UserCard from '../components/UserCard';
import TinderCard from 'react-tinder-card';
import {StyleSheet, Text, View} from 'react-native';
import {useMatchUsers} from '../queries/match';
import { BACKGROUND_MAIN, BLUE_MAIN } from "../../colors";

type Props = StackScreenProps<HomeStackParamList, 'FindSwipeScreen'>;

const FindSwipeScreen = ({route}: Props) => {
  const {event} = route.params;
  const {userProfile} = useContext(UserContext);
  const [position, setPosition] = useState(0);

  const {data: users, error, isLoading} = useMatchUsers(userProfile, event);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error occurred</Text>;
  }

  if (!users || users.length === 0 || position >= users.length) {
    return (
      <View style={styles.noMoreUsersContainer}>
        <Text style={styles.noMoreUsersText}>No more users</Text>
      </View>
    );
  }

  const onSwipe = () => {
    setPosition(prev => prev + 1);
  };

  const currentUser = users[position];

  console.log(position);
  console.log(currentUser);

  return (
    <View style={styles.container}>
      <TinderCard key={currentUser.id} onSwipe={onSwipe}>
        <UserCard user={currentUser} />
      </TinderCard>
    </View>
  );
};

const styles = StyleSheet.create({
  noMoreUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE_MAIN,
  },
  noMoreUsersText: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FindSwipeScreen;
