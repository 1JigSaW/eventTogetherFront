import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const FavouritesIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(37 * size) / 100}
      height={(34 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M34.1585 16.4444C34.6865 14.7889 35 13.0037 35 11.0724C35 6.05743 30.8915 2 25.826 2C22.823 2 20.1665 3.42828 18.5 5.63551C16.8335 3.42828 14.1605 2 11.174 2C6.1085 2 2 6.05743 2 11.0724C2 22.4331 12.692 29.1359 17.477 30.7589C17.7575 30.8562 18.1205 30.9049 18.5 30.9049"
          stroke={color || BLACK_MAIN}
          strokeWidth="2.85539"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M27.971 31.051C30.887 31.051 33.251 28.7258 33.251 25.8575C33.251 22.9893 30.887 20.6641 27.971 20.6641C25.0549 20.6641 22.691 22.9893 22.691 25.8575C22.691 28.7258 25.0549 31.051 27.971 31.051Z"
          stroke={color || BLACK_MAIN}
          strokeWidth="2.85539"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M34.2409 32.0248L32.5909 30.4019"
          stroke={color || BLACK_MAIN}
          strokeWidth="2.85539"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default FavouritesIcon;
