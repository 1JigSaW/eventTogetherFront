import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {
  BACKGROUND_MAIN,
  BLACK_MAIN,
  BLUE_MAIN,
  RED_MAIN,
  WHITE_MAIN,
} from '../../colors';
import {Bold, Regular} from '../../fonts';
import PeopleIcon from './icons/PeopleIcon';
import AddIcon from './icons/AddIcon';
import HeartIcon from './icons/HeartIcon';
import { useAddUserFavourite, useGetUserFavourites, useRemoveUserFavourite } from "../queries/favourite";
import {UserContext} from '../../App';

const EventCard = ({item}: any) => {
  const {user} = useContext(UserContext);
  const addUserFavourite = useAddUserFavourite();
  const removeUserFavourite = useRemoveUserFavourite();

  const {data: userFavourites, isLoading, isError} = useGetUserFavourites(user);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (userFavourites) {
      const favouriteIds = userFavourites.map(fav => fav.favourite_event);
      setIsFavourite(favouriteIds.includes(item.id));
    }
  }, [item.id, userFavourites]);

  const handleAddToFavourite = () => {
    if (isFavourite) {
      removeUserFavourite.mutate(
        {user: user, favourite_event: item.id},
        {
          onSuccess: () => {
            setIsFavourite(false);
          },
        },
      );
    } else {
      addUserFavourite.mutate(
        {user: user, favourite_event: item.id},
        {
          onSuccess: () => {
            setIsFavourite(true);
          },
        },
      );
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError) {
    return <Text>Error loading favourites...</Text>;
  }

  return (
    <View style={styles.whiteBlock}>
      <View style={styles.topPart}>
        <View style={styles.leftPart}>
          <Image
            style={styles.image}
            source={{uri: 'https://www.brandsoftheworld.com/logo/dsf'}}
          />
        </View>
        <View style={styles.rightPart}>
          <View style={styles.textRight}>
            <Text style={styles.textCity}>{item.city}</Text>
          </View>
          <View style={styles.textRight}>
            <Text style={styles.textDate}>
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textDescription}>
            <Text style={styles.textDescription}>
              {`${item.description.substring(0, 100)}...`}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.bottomPart}>
        <View style={styles.row}>
          <PeopleIcon
            size={100}
            color={RED_MAIN}
            style={{marginLeft: 15, marginBottom: 5.5}}
          />
          <Text style={styles.textCountPeople}>32</Text>
          <View style={styles.invitation}>
            <AddIcon size={100} />
            <Text style={styles.invitationButton}>Wait for an invitation</Text>
          </View>
        </View>
        <View style={styles.find}>
          <Text style={styles.findText}>Find someone to go with</Text>
        </View>
        <Pressable style={styles.row} onPress={handleAddToFavourite}>
          {!isFavourite ? (
            <HeartIcon size={100} color={RED_MAIN} />
          ) : (
            <HeartIcon size={100} color={BLUE_MAIN} />
          )}
        </Pressable>
      </View>
    </View>
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
    backgroundColor: WHITE_MAIN,
    borderWidth: 1,
    marginTop: 8,
  },
  topPart: {
    flexDirection: 'row',
  },
  leftPart: {
    borderWidth: 1,
    width: 111,
    margin: 11,
    borderRadius: 15,
  },
  image: {
    height: 85,
    width: 111,
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
  },
  textDate: {
    color: BLACK_MAIN,
    fontSize: 15,
    fontFamily: Regular,
    lineHeight: 20,
  },
  textTitle: {
    color: BLACK_MAIN,
    fontSize: 18,
    fontFamily: Bold,
    lineHeight: 22,
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
    marginLeft: 2.5,
    fontSize: 16,
    color: BLACK_MAIN,
    marginBottom: 5,
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
    backgroundColor: BLUE_MAIN,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 4,
    marginLeft: 10,
  },
  findText: {
    fontSize: 10,
    alignItems: 'center',
    lineHeight: 20,
    color: BLACK_MAIN,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventCard;
