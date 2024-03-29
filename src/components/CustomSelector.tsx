import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle, Platform
} from "react-native";
import { BEIGE, BLACK_MAIN, BLUE, GRAY_1, GRAY_2, ORANGE_MAIN, WHITE, WHITE_MAIN } from "../../colors";
import CloseIcon from './icons/CloseIcon';
import {Regular} from '../../fonts';

interface Props {
  selectedItems: string[];
  onSelect: (languages: string[]) => void;
  useSearchItems: (query: string) => {data: any};
  placeholder: string;
  style?: ViewStyle | undefined;
}

export const CustomSelector: React.FC<Props> = ({
  selectedItems,
  onSelect,
  useSearchItems,
  placeholder,
  style,
}) => {
  const [query, setQuery] = useState('');
  const {data: items} = useSearchItems(query);

  const removeItem = (lang: string) => {
    onSelect(selectedItems.filter(item => item !== lang));
  };

  return (
    <View style={[styles.main, selectedItems.length > 2 && {marginTop: 1}]}>
      <View style={styles.mainContainer}>
        {selectedItems.map((item, idx) => (
          <View key={idx} style={styles.mainItem}>
            <Text style={styles.mainText}>{item}</Text>
            <TouchableOpacity onPress={() => removeItem(item)}>
              <CloseIcon size={100} color={BLACK_MAIN} />
            </TouchableOpacity>
          </View>
        ))}
        <TextInput
          style={[styles.textInput, style]}
          autoCorrect={false}
          onChangeText={setQuery}
          placeholderTextColor={GRAY_1}
          value={query}
          placeholder={placeholder}
          multiline={true}
        />
      </View>
      <View style={styles.dropBlock}>
        {items &&
          items
            .filter((item: {name: string}) =>
              item.name.toLowerCase().startsWith(query.toLowerCase()),
            )
            .map((item: any, idx: number) => (
              <TouchableOpacity
                style={styles.dropOneBlock}
                key={idx}
                onPress={() => {
                  onSelect([...selectedItems, item.name]);
                  setQuery('');
                }}>
                <Text style={styles.dropText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 8,
  },
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  mainItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BLUE,
    paddingHorizontal: 5,
    borderRadius: 15,
    margin: 3,
  },
  mainText: {
    fontSize: 19,
    color: 'black',
    marginRight: 5,
  },
  removeButton: {
    fontSize: 16,
    color: 'red',
  },
  textInput: {
    backgroundColor: GRAY_2,
    borderColor: GRAY_1,
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: WHITE,
    fontFamily: Regular,
    paddingVertical: 4,
    height: Platform.OS === 'android' ? 40 : 30,
    flexGrow: 1,
  },
  dropBlock: {
    backgroundColor: WHITE_MAIN,
    marginTop: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  dropOneBlock: {
    paddingVertical: 2,
  },
  dropText: {
    color: BLACK_MAIN,
    fontFamily: Regular,
    fontSize: 20,
  },
});
