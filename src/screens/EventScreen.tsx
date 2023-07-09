import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {
  useAddUserFavourite,
  useGetEvent,
  useGetUserFavourites,
  useRemoveUserFavourite,
} from '../queries/favourite';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import {Event} from '../api/event.api';
import {
  BACKGROUND_MAIN,
  BLACK_MAIN,
  BLUE_MAIN,
  ORANGE_MAIN,
  RED_MAIN,
  WHITE_MAIN,
} from '../../colors';
import {Bold, Regular, SemiBold} from '../../fonts';
import {useEventProfiles} from '../queries/event';
import ProfileIcon from '../components/icons/ProfileIcon';
import AddIcon from '../components/icons/AddIcon';
import HeartIcon from '../components/icons/HeartIcon';
import {queryClient, UserContext} from '../../App';
import {useFocusEffect} from '@react-navigation/native';

type Props = StackScreenProps<HomeStackParamList, 'EventScreen'>;

const EventScreen = ({navigation, route}: Props) => {
  const eventId = route.params.event;
  const {user} = useContext(UserContext);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const {data} = useGetEvent(eventId);
  const {data: attendees, isLoading, error} = useEventProfiles(eventId);
  const addUserFavourite = useAddUserFavourite();
  const removeUserFavourite = useRemoveUserFavourite();

  const {data: userFavourites} = useGetUserFavourites(user);

  const allAttendees = (
    attendees?.pages.flatMap(page => page.results) || []
  ).slice(0, 5);

  useLayoutEffect(() => {
    if (eventData) {
      navigation.setOptions({
        title: eventData.title,
      });
    }
  }, [eventData, navigation]);

  useEffect(() => {
    if (data) {
      setEventData(data as Event);
    }
  }, [data]);

  useFocusEffect(
    React.useCallback(() => {
      if (userFavourites) {
        const favouriteIds = userFavourites.map(fav => fav.favourite_event);
        setIsFavourite(favouriteIds.includes(eventId));
      }
    }, [eventId, userFavourites]),
  );

  const handleAddToFavourite = () => {
    if (isFavourite) {
      removeUserFavourite.mutate(
        {user: user, favourite_event: eventId},
        {
          onSuccess: () => {
            setIsFavourite(false);
            queryClient.invalidateQueries(['REMOVE_USER_FAVOURITE_QUERY_KEY']);
          },
        },
      );
    } else {
      addUserFavourite.mutate(
        {user: user, favourite_event: eventId},
        {
          onSuccess: () => {
            setIsFavourite(true);
            queryClient.invalidateQueries(['ADD_USER_FAVOURITE_QUERY_KEY']);
          },
        },
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.insideBlock}>
        {eventData && eventData && (
          <Image source={{uri: null}} style={{width: '100%', height: 200}} />
        )}
        <Pressable
          style={[
            styles.favourites,
            isFavourite && {backgroundColor: RED_MAIN},
          ]}
          onPress={handleAddToFavourite}>
          {!isFavourite ? (
            <>
              <HeartIcon size={100} color={RED_MAIN} style={{marginTop: 8}} />
              <Text style={styles.textFavourites}>Add to favourites</Text>
            </>
          ) : (
            <>
              <HeartIcon size={100} color={BLUE_MAIN} style={{marginTop: 8}} />
              <Text style={[styles.textFavourites, {color: BLUE_MAIN}]}>
                Remove from favourites
              </Text>
            </>
          )}
        </Pressable>
        <Pressable style={styles.findBlock}>
          <Text style={styles.textFind}>Find to go with</Text>
        </Pressable>
        {/*{eventData && eventData.title && <Text>{eventData.title}</Text>}*/}
        <View style={{alignItems: 'flex-end'}}>
          {eventData && eventData.date && (
            <Text style={styles.textDate}>
              {new Date(eventData.date).toLocaleDateString()}
            </Text>
          )}
          {eventData && eventData.city && (
            <Text style={styles.textCity}>{eventData.city}</Text>
          )}
        </View>
        {eventData && eventData.description && (
          <Text style={styles.textDescription}>{eventData.description}</Text>
        )}
        <Text style={styles.title1}>Attendees:</Text>
        <View style={styles.attendeesBlock}>
          {allAttendees.map((attendee, index) => (
            <View key={index} style={styles.oneAttend}>
              <ProfileIcon size={150} />
              <Text style={styles.name}>
                {attendee.first_name} {attendee.last_name}
              </Text>
            </View>
          ))}
          <View style={{alignItems: 'center'}}>
            <AddIcon size={300} color={BLUE_MAIN} />
            <Text style={styles.add}>Add</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_MAIN,
  },
  insideBlock: {
    marginHorizontal: 8,
  },
  textDate: {
    fontFamily: Bold,
    fontSize: 25,
    color: BLACK_MAIN,
  },
  textCity: {
    fontFamily: Bold,
    fontSize: 25,
    color: BLACK_MAIN,
  },
  textDescription: {
    fontFamily: Regular,
    fontSize: 16,
    color: BLACK_MAIN,
  },
  attendeesBlock: {
    marginTop: 4,
    flexDirection: 'row',
    backgroundColor: WHITE_MAIN,
    alignItems: 'center',
    padding: 8,
    borderRadius: 15,
  },
  title1: {
    marginTop: 8,
    fontFamily: Bold,
    fontSize: 20,
    color: BLACK_MAIN,
  },
  oneAttend: {
    marginRight: 6,
    alignItems: 'center',
  },
  name: {
    color: BLACK_MAIN,
    fontFamily: Regular,
    fontSize: 16,
  },
  add: {
    fontSize: 12,
    color: BLUE_MAIN,
    fontFamily: Regular,
  },
  favourites: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: BLUE_MAIN,
    padding: 8,
  },
  textFavourites: {
    fontSize: 16,
    color: RED_MAIN,
    fontFamily: SemiBold,
    marginLeft: 4,
  },
  findBlock: {
    marginTop: 8,
    backgroundColor: BLUE_MAIN,
    borderRadius: 15,
    padding: 8,
  },
  textFind: {
    fontSize: 16,
    color: BLACK_MAIN,
    fontFamily: SemiBold,
    marginLeft: 4,
    alignSelf: 'center',
  },
});

export default EventScreen;
