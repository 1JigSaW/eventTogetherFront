import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {
  useAddUserFavourite,
  useGetEvent,
  useGetUserFavourites,
  useRemoveUserFavourite,
} from '../queries/favourite';
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Event} from '../api/event.api';
import {
  BLACK,
  BLACK_MAIN,
  BLUE,
  BLUE_MAIN,
  RED_MAIN,
  WHITE,
  WHITE_MAIN,
} from '../../colors';
import {Bold, Regular, SemiBold} from '../../fonts';
import {
  useAddUserToEvent,
  useEventProfiles,
  useRemoveUserFromEvent,
} from '../queries/event';
import {queryClient, UserContext} from '../../App';
import {useFocusEffect} from '@react-navigation/native';
import PeopleOneIcon from '../components/icons/PeopleOneIcon';
import LeftIcon from '../components/icons/LeftIcon';
import UserCheckIcon from '../components/icons/UserCheckIcon';
import UserPlusIcon from '../components/icons/UserPlusIcon';
import BookmarkAddIcon from '../components/icons/BookmarkAddIcon';
import BookmarkIcon from '../components/icons/BookmarkIcon';

type Props = StackScreenProps<HomeStackParamList, 'EventScreen'>;

const EventScreen = ({navigation, route}: Props) => {
  const eventId = route.params.event;
  const {user, userProfileExist, userProfile} = useContext(UserContext);
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  const {data} = useGetEvent(eventId);
  const {data: attendees, isLoading, error} = useEventProfiles(eventId);
  const addUserFavourite = useAddUserFavourite();
  const removeUserFavourite = useRemoveUserFavourite();

  const {data: userFavourites} = useGetUserFavourites(user);

  const addUserToEventMutation = useAddUserToEvent();
  const removeUserFromEventMutation = useRemoveUserFromEvent();

  const [awaitingInvite, setAwaitingInvite] = useState<boolean>(false);

  const [invitesCount, setInvitesCount] = useState(0);

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

  useEffect(() => {
    setAwaitingInvite(
      eventData?.awaiting_invite?.some((invite: number | null) => {
        return invite === userProfile;
      }) || false,
    );
  }, [eventData?.awaiting_invite, userProfile]);

  useFocusEffect(
    React.useCallback(() => {
      if (userFavourites) {
        const favouriteIds = userFavourites.map(fav => fav.favourite_event);
        setIsFavourite(favouriteIds.includes(eventId));
      }
    }, [eventId, userFavourites]),
  );

  const handleAddToFavourite = useCallback(() => {
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
  }, [addUserFavourite, eventId, isFavourite, removeUserFavourite, user]);

  useEffect(() => {
    if (eventData && eventData.awaiting_invite) {
      setInvitesCount(eventData.awaiting_invite.length);
    }
  }, [eventData]);

  const handleAddWait = useCallback(() => {
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
            eventId: eventId,
            userId: user,
          },
          {
            onSuccess: () => {
              setAwaitingInvite(false);
              setInvitesCount((prevCount: number) => prevCount - 1);
              queryClient.invalidateQueries(['eventProfilesRemove', eventId]);
              queryClient.invalidateQueries(['eventProfiles', eventId]);
            },
          },
        );
      } else {
        addUserToEventMutation.mutate(
          {
            eventId: eventId,
            userId: user,
          },
          {
            onSuccess: () => {
              setAwaitingInvite(true);
              setInvitesCount((prevCount: number) => prevCount + 1);
              queryClient.invalidateQueries(['eventProfilesAdd', eventId]);
              queryClient.invalidateQueries(['eventProfiles', eventId]);
            },
          },
        );
      }
    }
  }, [
    awaitingInvite,
    userProfileExist,
    navigation,
    removeUserFromEventMutation,
    addUserToEventMutation,
    eventId,
    user,
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            marginLeft: 15,
            marginTop: 5,
            borderRadius: 35,
            padding: 5,
            backgroundColor: BLUE,
          }}>
          <LeftIcon size={15} color={BLACK} />
        </Pressable>
      ),
      headerRight: () => (
        <View style={styles.bookmarkIconContainer}>
          <Pressable style={styles.iconBackground} onPress={handleAddWait}>
            {awaitingInvite ? (
              <UserCheckIcon size={15} color={BLACK} />
            ) : (
              <UserPlusIcon size={15} color={BLACK} />
            )}
          </Pressable>
          <Pressable onPress={handleAddToFavourite} style={styles.headerRight}>
            {isFavourite ? (
              <BookmarkAddIcon size={15} color={BLACK} />
            ) : (
              <BookmarkIcon size={15} color={BLACK} />
            )}
          </Pressable>
        </View>
      ),
    });
  }, [
    awaitingInvite,
    handleAddToFavourite,
    handleAddWait,
    isFavourite,
    navigation,
  ]);

  console.log(awaitingInvite);

  let dateString = '';
  let timeString = '';
  if (eventData) {
    let dateObject = new Date(eventData.date);
    dateString = dateObject.toLocaleDateString();
    timeString = dateObject.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <ScrollView style={styles.container} >
      <View style={styles.insideBlock}>
        {eventData && eventData && (
          <>
            <ImageBackground
              source={{
                uri: eventData.image
                  ? eventData.image.replace('image/upload/', '')
                  : 'https://res.cloudinary.com/dcrvubswi/image/upload/v1690060307/download_smfthh.jpg',
              }}
              style={{height: 200, marginBottom: 5, marginTop: 10}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  padding: 10,
                  backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                <Text style={{color: 'white', fontSize: 16}}>
                  {eventData.title}
                </Text>
                <Text style={{color: 'white', fontSize: 16}}>
                  {dateString} {timeString}
                </Text>
                <Text style={{color: 'white', fontSize: 16}}>
                  {eventData.city}
                </Text>
              </View>
            </ImageBackground>
          </>
        )}
        <View style={styles.additionalBlock}>
          {eventData && eventData.description && (
            <>
              <Text style={styles.textDescriptionTitle}>Description:</Text>
              <Text style={styles.textDescription}>
                {eventData.description}
              </Text>
            </>
          )}
          <Text style={styles.titleAttendees}>Attendees:</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('WaitingScreen', {event: eventId})
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8,
              marginLeft: 30,
            }}>
            {allAttendees.map((attendee, index) => (
              <View key={index} style={styles.oneAttend}>
                {!attendee?.image ? (
                  <View style={[styles.iconBackgroundBig, {marginLeft: -30}]}>
                    <PeopleOneIcon size={40} />
                  </View>
                ) : (
                  <Image
                    source={{
                      uri: attendee?.image.replace('image/upload/', ''),
                    }}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 125,
                      marginLeft: -30,
                    }}
                  />
                )}
              </View>
            ))}
            <View>
              {invitesCount > 5 && (
                <>
                  <Text style={styles.textCountPeople}>
                    + {invitesCount - 5}
                  </Text>
                  <Text style={styles.textCountPeople}>members</Text>
                </>
              )}
            </View>
            {/*<Pressable*/}
            {/*  style={{alignItems: 'center', marginLeft: 4}}*/}
            {/*  onPress={handleAddWait}>*/}
            {/*  {!awaitingInvite ? (*/}
            {/*    <AddIcon size={300} color={BLACK_MAIN} />*/}
            {/*  ) : (*/}
            {/*    <RemoveIcon size={300} color={BLACK_MAIN} />*/}
            {/*  )}*/}
            {/*</Pressable>*/}
          </Pressable>
        </View>
        {/*<View style={styles.attendeesBlock}>*/}
        {/*  <Pressable*/}
        {/*    onPress={() =>*/}
        {/*      navigation.navigate('WaitingScreen', {event: eventId})*/}
        {/*    }*/}
        {/*    style={{*/}
        {/*      width: '95%',*/}
        {/*      alignItems: 'center',*/}
        {/*      marginTop: 6,*/}
        {/*      borderWidth: 1,*/}
        {/*      borderRadius: 15,*/}
        {/*    }}>*/}
        {/*    <Text style={styles.allUsers}>See all</Text>*/}
        {/*  </Pressable>*/}
        {/*</View>*/}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    minHeight: 300,
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
    fontSize: 14,
    color: WHITE,
    marginTop: 4,
  },
  textDescriptionTitle: {
    fontFamily: Bold,
    fontSize: 16,
    color: WHITE,
  },
  attendeesBlock: {
    marginTop: 4,
    backgroundColor: WHITE_MAIN,
    alignItems: 'center',
    padding: 8,
    borderRadius: 15,
  },
  titleAttendees: {
    fontFamily: Bold,
    fontSize: 16,
    color: WHITE,
    marginTop: 4,
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
  allUsers: {
    color: BLACK_MAIN,
    fontSize: 16,
    fontFamily: Regular,
  },
  additionalBlock: {
    marginTop: 4,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  iconBackground: {
    backgroundColor: BLUE,
    borderRadius: 15,
    padding: 5,
    marginLeft: 7,
    marginTop: 5,
    marginRight: 6,
  },
  textCountPeople: {
    marginLeft: 6,
    fontSize: 12,
    color: WHITE,
    lineHeight: 12,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 15,
    marginTop: 5,
    borderRadius: 35,
    padding: 5,
    backgroundColor: BLUE,
  },
  bookmarkIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
  },
  iconBackgroundBig: {
    backgroundColor: BLUE,
    borderRadius: 100,
    padding: 10,
  },
});

export default EventScreen;
