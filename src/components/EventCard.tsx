import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  BACKGROUND_MAIN,
  BLACK,
  BLACK_MAIN,
  BLUE,
  BLUE_MAIN, GRAY_1, GRAY_2,
  WHITE,
  WHITE_MAIN
} from "../../colors";
import {Regular} from '../../fonts';
import {
  ADD_USER_FAVOURITE_QUERY_KEY,
  GET_USER_FAVOURITES_QUERY_KEY,
  REMOVE_USER_FAVOURITE_QUERY_KEY,
  useAddUserFavourite,
  useGetUserFavourites,
  useRemoveUserFavourite,
} from '../queries/favourite';
import {queryClient, UserContext} from '../../App';
import {
  useAddUserToEvent,
  useEventProfiles,
  useRemoveUserFromEvent,
} from '../queries/event';
import BookmarkIcon from './icons/BookmarkIcon';
import PeopleOneIcon from './icons/PeopleOneIcon';
import UserPlusIcon from './icons/UserPlusIcon';
import FindPeopleIcon from './icons/FindPeopleIcon';
import BookmarkAddIcon from './icons/BookmarkAddIcon';
import UserCheckIcon from './icons/UserCheckIcon';

const EventCard = ({item, navigation}: any) => {
  const {user, userProfileExist, userProfile} = useContext(UserContext);
  const addUserFavourite = useAddUserFavourite();
  const removeUserFavourite = useRemoveUserFavourite();
  const addUserToEventMutation = useAddUserToEvent();
  const removeUserFromEventMutation = useRemoveUserFromEvent();

  const {data: userFavourites, isLoading, isError} = useGetUserFavourites(user);
  const [invitesCount, setInvitesCount] = useState(item.awaiting_invite.length);

  const [isFavourite, setIsFavourite] = useState(false);

  const [awaitingInvite, setAwaitingInvite] = useState<boolean>(false);
  const {data: attendees} = useEventProfiles(item.id);

  useEffect(() => {
    setAwaitingInvite(
      item.awaiting_invite.some((invite: number | null) => {
        return invite === userProfile;
      }),
    );
  }, [item.awaiting_invite, userProfile]);

  React.useEffect(() => {
    if (userFavourites) {
      const favouriteIds = userFavourites.map(fav => fav.favourite_event);
      setIsFavourite(favouriteIds.includes(item.id));
    }
  }, [item.id, userFavourites]);

  useEffect(() => {
    if (item && item.awaiting_invite) {
      setInvitesCount(item.awaiting_invite.length);
    }
  }, [item]);

  const handleAddToFavourite = () => {
    if (isFavourite) {
      removeUserFavourite.mutate(
        {user: user, favourite_event: item.id},
        {
          onSuccess: () => {
            setIsFavourite(false);
            queryClient.invalidateQueries([REMOVE_USER_FAVOURITE_QUERY_KEY]);
            queryClient.invalidateQueries([
              GET_USER_FAVOURITES_QUERY_KEY,
              user,
            ]);
          },
        },
      );
    } else {
      addUserFavourite.mutate(
        {user: user, favourite_event: item.id},
        {
          onSuccess: () => {
            setIsFavourite(true);
            queryClient.invalidateQueries([ADD_USER_FAVOURITE_QUERY_KEY]);
            queryClient.invalidateQueries([
              GET_USER_FAVOURITES_QUERY_KEY,
              user,
            ]);
          },
        },
      );
    }
  };

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
    } else {
      if (awaitingInvite) {
        removeUserFromEventMutation.mutate(
          {
            eventId: item.id,
            userId: user,
          },
          {
            onSuccess: () => {
              setAwaitingInvite(false);
              setInvitesCount((prevCount: number) => prevCount - 1);
              queryClient.invalidateQueries(['eventProfilesRemove', item.id]);
              queryClient.invalidateQueries(['eventProfiles', item.id]);
            },
          },
        );
      } else {
        addUserToEventMutation.mutate(
          {
            eventId: item.id,
            userId: user,
          },
          {
            onSuccess: () => {
              setAwaitingInvite(true);
              setInvitesCount((prevCount: number) => prevCount + 1);
              queryClient.invalidateQueries(['eventProfilesAdd', item.id]);
              queryClient.invalidateQueries(['eventProfiles', item.id]);
            },
          },
        );
      }
    }
  };

  const allAttendeesData = attendees?.pages.flatMap(page => page.results) || [];

  let allAttendees = [...allAttendeesData];

  allAttendees = allAttendees.slice(0, 5);
  console.log(allAttendees);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error loading favourites...</Text>;
  }

  let dateString = '';
  let timeString = '';
  if (item) {
    let dateObject = new Date(item.date);
    dateString = dateObject.toLocaleDateString();
    timeString = dateObject.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return (
    <Pressable
      style={styles.whiteBlock}
      onPress={() => navigation.navigate('EventScreen', {event: item.id})}>
      <ImageBackground
        source={{
          uri: item.image
            ? item.image
                .replace('http://', 'https://')
                .replace('image/upload/', '')
            : 'https://res.cloudinary.com/dcrvubswi/image/upload/v1690060307/download_smfthh.jpg',
        }}
        style={styles.imageBlock}
        resizeMode="cover">
        <View style={styles.overlay} />
        <View style={styles.bookmarkIconContainer}>
          <Pressable style={styles.iconBackground} onPress={handleAddWait}>
            {awaitingInvite ? (
              <UserCheckIcon size={15} color={BLACK} />
            ) : (
              <UserPlusIcon size={15} color={BLACK} />
            )}
          </Pressable>
          <Pressable
            style={styles.iconBackground}
            onPress={handleAddToFavourite}>
            {isFavourite ? (
              <BookmarkAddIcon size={15} color={BLACK} />
            ) : (
              <BookmarkIcon size={15} color={BLACK} />
            )}
          </Pressable>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textTitle}>
            {dateString} {timeString}
          </Text>
          <Text style={styles.textTitle}>{item.city}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            marginRight: 10,
          }}>
          {invitesCount > 0 ? (
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
              }}
              onPress={() =>
                navigation.navigate('WaitingScreen', {event: item.id})
              }>
              {allAttendees.map((attendee, index) => (
                <View key={index}>
                  {!attendee?.image ? (
                    <View style={[styles.iconBackground, {marginLeft: -10}]}>
                      <PeopleOneIcon size={15} />
                    </View>
                  ) : (
                    <Image
                      source={{
                        uri: attendee?.image
                          ? attendee.image
                              .replace('http://', 'https://')
                              .replace('image/upload/', '')
                          : null,
                      }}
                      style={{
                        width: 25,
                        height: 25,
                        borderRadius: 125,
                        marginLeft: -10,
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
            </Pressable>
          ) : (
            <View />
          )}
          <Pressable
            style={styles.find}
            onPress={() => {
              if (userProfileExist) {
                navigation.navigate('FindSwipeScreen', {
                  event: item.id,
                  item: item,
                });
              } else {
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
              }
            }}>
            <FindPeopleIcon size={15} color={BLACK} style={{marginRight: 5}} />
            <Text style={styles.findText}>Find someone to go with</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </Pressable>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 5,
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
    overflow: 'hidden',
    marginTop: 8,
    height: 150,
  },
  topPart: {
    flexDirection: 'row',
  },
  leftPart: {
    height: 85,
    width: 111,
    margin: 11,
    borderRadius: 15,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  rightPart: {
    margin: 6,
    flex: 1,
  },
  textRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textCity: {
    color: BLACK_MAIN,
    fontSize: 15,
    fontFamily: Regular,
    lineHeight: 20,
    backgroundColor: BLACK,
  },
  textDate: {
    color: BLACK_MAIN,
    fontSize: 15,
    fontFamily: Regular,
    lineHeight: 20,
  },
  textTitle: {
    color: WHITE,
    fontSize: 12,
    fontFamily: Regular,
    lineHeight: 12,
    marginTop: 5,
  },
  textDescription: {
    color: BLACK_MAIN,
    fontSize: 12,
    fontFamily: Regular,
    lineHeight: 14,
  },
  bottomPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textCountPeople: {
    marginLeft: 6,
    fontSize: 12,
    color: WHITE,
    lineHeight: 12,
  },
  invitation: {
    flexDirection: 'row',
    backgroundColor: BLUE_MAIN,
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    lineHeight: 14,
    marginBottom: 4,
    marginLeft: 5,
  },
  invitationButton: {
    fontSize: 10,
    marginLeft: 3,
    color: BLACK_MAIN,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 7,
  },
  find: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  findText: {
    fontSize: 14,
    alignItems: 'center',
    lineHeight: 20,
    color: BLACK,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    flex: 1,
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Это сделает слой абсолютным и он займет всю область родителя
    backgroundColor: BLACK,
    opacity: 0.9,
  },
  iconBackground: {
    backgroundColor: BLUE,
    borderRadius: 15,
    padding: 5,
    marginLeft: 7,
  },
  bookmarkIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
  },
  bottomContainer: {
    margin: 6,
    width: '70%',
  },
});

export default EventCard;
