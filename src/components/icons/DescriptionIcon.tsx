import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const DescriptionIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(33 * size) / 100}
      height={(33 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M32 13.4V21.15C32 28.9 28.9 32 21.15 32H11.85C4.1 32 1 28.9 1 21.15V11.85C1 4.1 4.1 1 11.85 1H19.6"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M32 13.4H25.8C21.15 13.4 19.6 11.85 19.6 7.2V1L32 13.4Z"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.75 18.05H18.05"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M8.75 24.25H14.95"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default DescriptionIcon;
