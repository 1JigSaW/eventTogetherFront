import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import React, { useContext, useEffect, useState } from "react";
import { queryClient, UserContext } from "../../App";
import UserCard from '../components/UserCard';
import TinderCard from 'react-tinder-card';
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {useMatchUsers} from '../queries/match';
import {
  BACKGROUND_MAIN,
  BLACK_MAIN,
  BLUE_MAIN, ORANGE_MAIN,
  RED_MAIN,
  WHITE_MAIN,
} from '../../colors';
import {Regular} from '../../fonts';
import {useAddUserToEvent, useRemoveUserFromEvent} from '../queries/event';

type Props = StackScreenProps<HomeStackParamList, 'FindSwipeScreen'>;

const FindSwipeScreen = ({route, navigation}: Props) => {
  const {event, item} = route.params;
  const {userProfile, userProfileExist, user} = useContext(UserContext);
  const [position, setPosition] = useState(0);
  const [awaitingInvite, setAwaitingInvite] = useState<boolean>(false);

  const {data: users, error, isLoading} = useMatchUsers(userProfile, event);
  const addUserToEventMutation = useAddUserToEvent();
  const removeUserFromEventMutation = useRemoveUserFromEvent();

  useEffect(() => {
    setAwaitingInvite(
      item.awaiting_invite.some((invite: number | null) => {
        return invite === userProfile;
      }),
    );
  }, [item.awaiting_invite, userProfile]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error occurred</Text>;
  }

  const handleAddWait = () => {
    if (!userProfileExist) {
      Alert.alert('Profile not found', 'Create your profile first', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Go to Profile',
          onPress: () => {
            navigation.navigate('AccountScreen');
          },
        },
      ]);
      return;
    } else {
      if (awaitingInvite) {
        removeUserFromEventMutation.mutate(
          {
            eventId: event,
            userId: user,
          },
          {
            onSuccess: () => {
              setAwaitingInvite(false);
              queryClient.invalidateQueries(['useEventProfilesQueryKey']);
            },
          },
        );
      } else {
        addUserToEventMutation.mutate(
          {
            eventId: event,
            userId: user,
          },
          {
            onSuccess: () => {
              setAwaitingInvite(true);
              queryClient.invalidateQueries(['useEventProfilesQueryKey']);
            },
          },
        );
      }
    }
  };

  if (!users || users.length === 0 || position >= users.length) {
    return (
      <View style={styles.noMoreUsersContainer}>
        <Text style={styles.noMoreUsersText}>No more users</Text>
        <Pressable style={[styles.emptyButton, awaitingInvite && {backgroundColor: ORANGE_MAIN}]} onPress={handleAddWait}>
          {!awaitingInvite ? (
            <Text style={styles.textButton}>Wait for an invitation</Text>
          ) : (
            <Text style={styles.textButton}>You are on the waiting list</Text>
          )}
        </Pressable>
        <Pressable
          style={styles.emptyButton}
          onPress={() => navigation.navigate('WaitingScreen', {event: event})}>
          <Text style={styles.textButton}>Find yourself</Text>
        </Pressable>
        <Pressable
          style={[styles.emptyButton, {backgroundColor: RED_MAIN}]}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.textButton, {color: WHITE_MAIN}]}>Close</Text>
        </Pressable>
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
      <View style={styles.insideBlock}>
        <View style={styles.contentContainer}>
          <TinderCard key={currentUser.id} onSwipe={onSwipe}>
            <UserCard user={currentUser} />
          </TinderCard>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.buttonBlock, {backgroundColor: RED_MAIN}]}
            onPress={() => onSwipe()}>
            <Text style={styles.buttonText}>Skip</Text>
          </Pressable>
          <Pressable
            style={[styles.buttonBlock, {backgroundColor: BLUE_MAIN}]}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                user: currentUser.id,
                event: event,
              })
            }>
            <Text style={styles.buttonText}>Invite</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noMoreUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_MAIN,
  },
  noMoreUsersText: {
    fontSize: 24,
    marginBottom: 12,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // чтобы кнопки располагались горизонтально
    justifyContent: 'space-between', // чтобы между кнопками было немного пространства
  },
  buttonBlock: {
    backgroundColor: WHITE_MAIN,
    paddingVertical: 4,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: Regular,
    fontSize: 32,
    color: BLACK_MAIN,
  },
  insideBlock: {
    marginHorizontal: 32,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyButton: {
    backgroundColor: BLUE_MAIN,
    paddingVertical: 10,
    paddingHorizontal: 27,
    borderRadius: 30,
    marginTop: 8,
    width: '80%',
  },
  textButton: {
    fontSize: 20,
    fontFamily: Regular,
    color: BLACK_MAIN,
    alignSelf: 'center',
  },
});

export default FindSwipeScreen;
