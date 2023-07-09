import React, {useContext} from 'react';
import {UserContext} from '../../App';
import { FlatList, ListRenderItem, Pressable, StyleSheet, Text, View } from "react-native";
import {
  BACKGROUND_MAIN,
  BLACK_MAIN,
  ORANGE_MAIN,
  WHITE_MAIN,
} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {useEventProfiles} from '../queries/event';
import {UserProfileData} from '../api/userprofile';
import ProfileIcon from '../components/icons/ProfileIcon';
import {Bold, Regular} from '../../fonts';

type Props = StackScreenProps<HomeStackParamList, 'WaitingScreen'>;

const WaitingScreen = ({navigation, route}: Props) => {
  const {event} = route.params;
  const {user} = useContext(UserContext);
  const {data: attendees, isLoading, error} = useEventProfiles(event);
  console.log(attendees?.pages[0].results);

  const allAttendees = attendees?.pages.flatMap(page => page.results) || [];

  const renderItem: ListRenderItem<UserProfileData> = ({item}) => {
    const languages = item.language.map(lang => lang).join(', ');
    const interests = item.interests.map(inter => inter).join(', ');
    return (
      <View style={styles.block}>
        <View style={styles.row}>
          <View>
            <ProfileIcon size={200} />
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <View style={[styles.row]}>
              <Text style={styles.textName}>{item.first_name}</Text>
              <Text style={[styles.textName, {marginLeft: 4}]}>
                {item.last_name}
              </Text>
            </View>
            {item.age && (
              <View style={styles.row}>
                <View style={{marginRight: 16}}>
                  <Text style={styles.textAddition}>Age: {item.age}</Text>
                </View>
              </View>
            )}
            {languages && (
              <View style={styles.row}>
                <View>
                  <Text style={styles.textAddition}>
                    Languages: {languages}
                  </Text>
                </View>
              </View>
            )}
            {interests && (
              <View style={styles.row}>
                <View>
                  <Text style={styles.textAddition}>
                    Interests: {interests}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
        {item.description && (
          <Text style={styles.textAddition}>{item.description}</Text>
        )}
        {item.user !== user && (
          <Pressable
            style={styles.buttonInvite}
            onPress={() =>
              navigation.navigate('ChatScreen', {
                user: item.id,
                event: event,
              })
            }>
            <Text style={styles.textAddition}>Invite</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.insideBlock}
        data={allAttendees}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={{height: 50}} />}
      />
    </View>
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
  block: {
    borderRadius: 15,
    backgroundColor: WHITE_MAIN,
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  textName: {
    color: BLACK_MAIN,
    fontSize: 15,
    fontFamily: Bold,
    lineHeight: 20,
  },
  textAddition: {
    color: BLACK_MAIN,
    fontSize: 15,
    fontFamily: Regular,
    lineHeight: 20,
  },
  buttonInvite: {
    borderRadius: 15,
    backgroundColor: ORANGE_MAIN,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default WaitingScreen;
