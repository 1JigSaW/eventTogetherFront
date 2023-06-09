import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {BACKGROUND_MAIN, BLACK_MAIN, BLUE_MAIN, WHITE_MAIN} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {Bold, Regular} from '../../fonts';
import View = Animated.View;
import SearchIcon from '../components/icons/SearchIcon';
import {useEvents, useSearchEvents} from '../queries/event';
import {Event} from '../api/event.api';
import EventCard from '../components/EventCard';
import {useFocusEffect} from '@react-navigation/native';

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const {data, error, isLoading, isError, fetchNextPage, hasNextPage, refetch} =
    useEvents(page);
  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    error: errorSearch,
  } = useSearchEvents(search.length > 2 ? search : null);

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insideBlock}>
        <View style={styles.searchContainer}>
          <SearchIcon size={100} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </View>
        {searchResults?.length === undefined && search.length > 2 ? (
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
  notFoundText: {
    fontSize: 16,
    color: BLACK_MAIN,
    fontFamily: Regular,
    alignSelf: 'center',
  },
});

export default HomeScreen;
