import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const AddIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(11 * size) / 100}
      height={(11 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M3.70001 5.5H7.30001"
          stroke={color || BLACK_MAIN}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M5.5 7.29998V3.69998"
          stroke={color || BLACK_MAIN}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M4.15 10H6.85C9.1 10 10 9.1 10 6.85V4.15C10 1.9 9.1 1 6.85 1H4.15C1.9 1 1 1.9 1 4.15V6.85C1 9.1 1.9 10 4.15 10Z"
          stroke={color || BLACK_MAIN}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default AddIcon;
