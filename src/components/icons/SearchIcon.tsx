import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const SearchIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(21 * size) / 100}
      height={(19 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M9.64219 18.1164C4.32723 18.1164 0 14.0512 0 9.05818C0 4.06514 4.32723 0 9.64219 0C14.9572 0 19.2844 4.06514 19.2844 9.05818C19.2844 14.0512 14.9572 18.1164 9.64219 18.1164ZM9.64219 1.32559C5.0986 1.32559 1.41105 4.79863 1.41105 9.05818C1.41105 13.3177 5.0986 16.7908 9.64219 16.7908C14.1858 16.7908 17.8733 13.3177 17.8733 9.05818C17.8733 4.79863 14.1858 1.32559 9.64219 1.32559Z"
          fill={color || BLACK_MAIN}
        />
        <Path
          d="M19.5199 19C19.3411 19 19.1624 18.9381 19.0213 18.8056L17.1399 17.0381C16.8671 16.7819 16.8671 16.3577 17.1399 16.1014C17.4127 15.8451 17.8642 15.8451 18.137 16.1014L20.0185 17.8688C20.2913 18.1251 20.2913 18.5493 20.0185 18.8056C19.8773 18.9381 19.6986 19 19.5199 19Z"
          fill={color || BLACK_MAIN}
        />
      </G>
    </Svg>
  );
};

export default SearchIcon;
