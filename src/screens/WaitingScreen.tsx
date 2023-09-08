import React, {useContext} from 'react';
import {UserContext} from '../../App';
import {
  Alert,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {BLACK, BLUE, GRAY_1, GRAY_2, WHITE} from '../../colors';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../navigation/HomeStackNavigator';
import {useEventProfiles} from '../queries/event';
import {UserProfileData} from '../api/userprofile';
import {Bold, Regular} from '../../fonts';
import PeopleOneIcon from '../components/icons/PeopleOneIcon';

type Props = StackScreenProps<HomeStackParamList, 'WaitingScreen'>;

const WaitingScreen = ({navigation, route}: Props) => {
  const {event} = route.params;
  const {user, userProfileExist} = useContext(UserContext);
  const {data: attendees, isLoading, error} = useEventProfiles(event);
  console.log(attendees?.pages[0].results);

  const allAttendees = attendees?.pages.flatMap(page => page.results) || [];

  const renderItem: ListRenderItem<UserProfileData> = ({item}) => {
    const languages = item.language.map(lang => lang).join(', ');
    const interests = item.interests.map(inter => inter).join(', ');
    let image_url = item.image
      ?.replace('http://', 'https://')
      .replace('image/upload/', '');
    return (
      <View style={styles.block}>
        <View style={styles.row}>
          <View>
            {!item.image ? (
              <View style={styles.iconBackgroundBig}>
                <PeopleOneIcon size={48} />
              </View>
            ) : (
              <Image
                source={{uri: image_url}}
                style={{width: 80, height: 80, borderRadius: 125}}
              />
            )}
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
            onPress={() => {
              if (userProfileExist) {
                navigation.navigate('ChatScreen', {
                  user: item.id,
                  event: event,
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
            <Text style={[styles.textAddition, {color: BLACK}]}>Invite</Text>
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
    backgroundColor: BLACK,
  },
  insideBlock: {
    marginHorizontal: 8,
  },
  block: {
    borderRadius: 15,
    backgroundColor: GRAY_2,
    borderWidth: 1,
    marginTop: 8,
    padding: 10,
    borderColor: GRAY_1,
  },
  row: {
    flexDirection: 'row',
  },
  textName: {
    color: WHITE,
    fontSize: 15,
    fontFamily: Bold,
    lineHeight: 20,
  },
  textAddition: {
    color: WHITE,
    fontSize: 15,
    fontFamily: Regular,
    lineHeight: 20,
  },
  buttonInvite: {
    borderRadius: 15,
    backgroundColor: BLUE,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  iconBackgroundBig: {
    backgroundColor: BLUE,
    borderRadius: 100,
    padding: 15,
  },
});

export default WaitingScreen;
