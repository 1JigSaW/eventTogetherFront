import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {
  BACKGROUND_MAIN,
  BEIGE,
  BLACK,
  BLACK_MAIN,
  BLUE_MAIN,
  GRAY_1,
  GRAY_2,
  WHITE,
  WHITE_MAIN,
} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {Bold, Regular} from '../../fonts';
import View = Animated.View;
import SearchIcon from '../components/icons/SearchIcon';
import {useEvents, useSearchEvents} from '../queries/event';
import {Event} from '../api/event.api';
import EventCard from '../components/EventCard';
import {useFocusEffect} from '@react-navigation/native';
import ProfileIcon from '../components/icons/ProfileIcon';
import {UserContext} from '../../App';
import {useUserProfileDetail} from '../queries/userprofile';
import {useGetEvents, useGetUserFavourites} from '../queries/favourite';

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  const {user} = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState<string | null>(null);
  const {data, error, isLoading, isError, fetchNextPage, hasNextPage, refetch} =
    useEvents(page);
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useSearchEvents(search.length > 2 ? search : null);

  const userProfileDetailQuery = useUserProfileDetail(user);

  const {
    data: userFavourites,
    isLoading: isLoadingFavourites,
    isError: isErrorFavourites,
  } = useGetUserFavourites(user);

  const eventIds = (
    userFavourites?.map(favourite => favourite.favourite_event) || []
  ).slice(0, 4);

  const {
    data: events,
    isLoading: isLoadingEvents,
    isError: isErrorEvents,
  } = useGetEvents(eventIds);

  useFocusEffect(
    React.useCallback(() => {
      userProfileDetailQuery.refetch();
    }, [userProfileDetailQuery]),
  );

  useEffect(() => {
    if (userProfileDetailQuery.data) {
      const profileData = userProfileDetailQuery.data;
      if (profileData.image) {
        let image_url = profileData.image
          .replace('http://', 'https://')
          .replace('image/upload/', '');
        setPhoto(image_url);
      }
    }
  }, [userProfileDetailQuery.data]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: BACKGROUND_MAIN,
        borderBottomWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerLeft: () => (
        <Pressable onPress={() => navigation.navigate('AccountScreen')}>
          {!photo ? (
            <ProfileIcon size={100} style={styles.headerLeft} />
          ) : (
            <Image
              source={{uri: photo}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 125,
                marginLeft: 8,
              }}
            />
          )}
        </Pressable>
      ),
    });
  }, [navigation, photo]);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const noResultsMessage = 'No events found matching the search query';

  if (isError || (search && errorSearch)) {
    return (
      <View>
        <Text>Error: {(error || errorSearch).message}</Text>
      </View>
    );
  }

  const handleLoadMore = () => {
    if (hasNextPage) {
      setPage(page + 1);
      fetchNextPage();
    }
  };

  const allData = data?.pages.flatMap(pageData => pageData.results) || [];

  const displayedData = search ? searchResults || [] : allData;

  const renderItem: ListRenderItem<Event> = ({item}) => {
    return <EventCard item={item} navigation={navigation} />;
  };

  console.log('userFavourites', userFavourites);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insideBlock}>
        <View style={styles.searchContainer}>
          <SearchIcon size={100} color={WHITE} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={BEIGE}
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </View>
        {userFavourites && userFavourites?.length !== 0 && (
          <View style={{marginTop: 3}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.titleFavourites}>My favourites</Text>
              {userFavourites.length > 4 && (
                <Pressable
                  onPress={() => navigation.navigate('FavouritesScreen')}>
                  <Text style={styles.titleFavourites}>See all</Text>
                </Pressable>
              )}
            </View>
            <View style={[styles.row2, {minHeight: 90}]}>
              {isLoadingEvents ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                Array.isArray(events) &&
                events?.map((event: any, index: number) => (
                  <Pressable
                    key={index}
                    style={styles.eventContainer}
                    onPress={() =>
                      navigation.navigate('EventScreen', {event: event.id})
                    }>
                    {event.image ? (
                      <Image
                        source={{
                          uri: event.image
                            ? event.image
                                .replace('http://', 'https://')
                                .replace('image/upload/', '')
                            : 'https://res.cloudinary.com/dcrvubswi/image/upload/v1690060307/download_smfthh.jpg',
                        }}
                        resizeMode="contain"
                        style={styles.eventImage}
                      />
                    ) : (
                      <Image
                        source={{
                          uri: event.image
                            ? event.image
                                .replace('http://', 'https://')
                                .replace('image/upload/', '')
                            : 'https://res.cloudinary.com/dcrvubswi/image/upload/v1690060307/download_smfthh.jpg',
                        }}
                        resizeMode="contain"
                        style={styles.eventImage}
                      />
                    )}
                    <Text style={styles.eventTitle}>
                      {new Date(event.date).toLocaleDateString()}
                    </Text>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        )}
        {!searchResults?.length && search.length > 2 ? (
          <Text style={styles.notFoundText}>{noResultsMessage}</Text>
        ) : (
          <FlatList
            data={displayedData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            onEndReached={handleLoadMore}
            ListFooterComponent={<View style={{height: 50}} />}
          />
        )}
        {(isLoading || isLoadingSearch) && <ActivityIndicator />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: GRAY_2,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: GRAY_1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 5,
    marginTop: 10,
  },
  insideBlock: {
    marginHorizontal: 8,
    flex: 1,
  },
  searchInput: {
    fontSize: 14,
    fontFamily: Regular,
    paddingVertical: 0,
    marginLeft: 4,
    flex: 1,
    color: BEIGE,
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
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  find: {
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
  notFoundText: {
    fontSize: 16,
    color: WHITE,
    fontFamily: Regular,
    alignSelf: 'center',
  },
  headerLeft: {
    marginLeft: 8,
  },
  titleFavourites: {
    color: WHITE,
    fontFamily: Regular,
    fontSize: 16,
    marginBottom: 3,
  },
  eventContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  eventImage: {
    width: 80,
    height: 40,
  },
  eventTitle: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: WHITE,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#cccccc', // Цвет для плейсхолдера изображения
  },
});

export default HomeScreen;
