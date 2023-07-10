import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import React, {useContext, useState} from 'react';
import {useMatchUser} from '../queries/match';
import {UserContext} from '../../App';
import UserCard from '../components/UserCard';
import TinderCard from 'react-tinder-card';
import {Animated, Text, View} from 'react-native';

type Props = StackScreenProps<HomeStackParamList, 'FindSwipeScreen'>;

const FindSwipeScreen = ({route}: Props) => {
  const {event} = route.params;
  const {userProfile} = useContext(UserContext);
  const [position, setPosition] = useState(0);

  const {
    data: currentUser,
    error,
    isLoading,
  } = useMatchUser(userProfile, event, position);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error || !currentUser) {
    return <Text>Error occurred or No more users</Text>;
  }

  const renderLeftActions = (progress: Animated.AnimatedInterpolation<any>) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
    return (
      <View style={{flex: 1}}>
        <Animated.Text
          style={[
            {transform: [{translateX: translateX}]},
            {padding: 10, color: 'white'},
          ]}>
          Swipe Left
        </Animated.Text>
      </View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<any>,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });
    return (
      <View style={{flex: 1}}>
        <Animated.Text
          style={[
            {transform: [{translateX: translateX}]},
            {padding: 10, color: 'white'},
          ]}>
          Swipe Right
        </Animated.Text>
      </View>
    );
  };

  const onSwipe = direction => {
    console.log('You swiped: ' + direction);
    setPosition(prev => prev + 1);
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen');
  };
  console.log(currentUser[0]);
  console.log(position);
  return (
    <TinderCard
      onSwipe={onSwipe}
      onCardLeftScreen={() => onCardLeftScreen('fooBar')}>
      <UserCard user={currentUser[0]} />
    </TinderCard>
  );
};

export default FindSwipeScreen;
