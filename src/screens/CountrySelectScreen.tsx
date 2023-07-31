import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../App';
import {COUNTRY} from '../../constants';
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BLACK, BLUE, GRAY_2} from '../../colors';
import {Regular} from '../../fonts';
import {useUniqueCountries} from '../queries/country';

const CountrySelectScreen = () => {
  const {setCountry} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  const {data, isLoading, error} = useUniqueCountries();

  const handleCountrySelect = async (selectedCountry: string) => {
    setCountry(selectedCountry);
    setModalVisible(false);

    try {
      await AsyncStorage.setItem(COUNTRY, selectedCountry);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(data);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insideBlock}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Select your country:</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  key={item.country}
                  style={styles.listItem}
                  onPress={() => handleCountrySelect(item.country)}>
                  <Text style={styles.listItemText}>{item.country}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: BLACK,
  },
  insideBlock: {
    flex: 1,
  },
  button: {
    padding: 10,
    backgroundColor: BLUE,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: BLACK,
    textAlign: 'center',
    fontFamily: Regular,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    backgroundColor: GRAY_2,
    padding: 10,
    marginTop: 70,
    borderRadius: 15,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 18,
    color: BLACK,
    textAlign: 'center',
    fontFamily: Regular,
  },
});

export default CountrySelectScreen;
