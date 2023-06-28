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

  const isLoading = isLoadingFavourites || isLoadingEvents;
  const isError = isErrorFavourites || isErrorEvents;

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (isError || !events) {
    return <Text>Error loading favourites or events...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.insideBlock}>
        {events.map((event: Event) => (
          <EventCard key={event} item={event} />
        ))}
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
});

export default FavouritesScreen;
