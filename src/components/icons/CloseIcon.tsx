import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const CloseIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(18 * size) / 100}
      height={(18 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M9 17C13.4 17 17 13.4 17 9C17 4.6 13.4 1 9 1C4.6 1 1 4.6 1 9C1 13.4 4.6 17 9 17Z"
          stroke={color || BLACK_MAIN}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M6.73599 11.264L11.264 6.73602"
          stroke={color || BLACK_MAIN}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M11.264 11.264L6.73599 6.73602"
          stroke={color || BLACK_MAIN}
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
    </Svg>
  );
};

export default CloseIcon;
