import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {BACKGROUND_MAIN} from '../../colors';
import React, {useContext} from 'react';
import View = Animated.View;
import {UserContext} from '../../App';
import {useGetEvents, useGetUserFavourites} from '../queries/favourite';
import EventCard from '../components/EventCard';

type Props = StackScreenProps<HomeStackParamList, 'FavouritesScreen'>;

const FavouritesScreen = ({navigation}: Props) => {
  const {user} = useContext(UserContext);

  const {
    data: userFavourites,
    isLoading: isLoadingFavourites,
    isError: isErrorFavourites,
  } = useGetUserFavourites(user);

  const eventIds =
    userFavourites?.map(favourite => favourite.favourite_event) || [];

  const {
    data: events,
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
  } = useGetEvents(eventIds);

  console.log(events);

  const isLoading = isLoadingFavourites || isLoadingEvents;
  const isError = isErrorFavourites || isErrorEvents;

  if (isError || !events) {
    return (
      <ScrollView style={styles.container}>
        <Text>Error loading favourites or events...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.insideBlock}>
        {Array.isArray(events) &&
          events.length > 0 ? (
          events.map((event: Event, index: number) => (
            <EventCard key={index} item={event} navigation={navigation} />
          ))
        ) : (
          <Text>As long as you haven't added anything</Text>
        )}
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
    paddingBottom: 10,
  },
});

export default FavouritesScreen;
