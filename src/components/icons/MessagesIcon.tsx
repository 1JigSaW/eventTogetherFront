import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const MessagesIcon = ({size, style, color}: Props) => {
  return (
    <Svg width={(38 * size) / 100} height={(38 * size) / 100} style={style} fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M13.05 30.9H12.2C5.4 30.9 2 29.2 2 20.7V12.2C2 5.4 5.4 2 12.2 2H25.8C32.6 2 36 5.4 36 12.2V20.7C36 27.5 32.6 30.9 25.8 30.9H24.95C24.423 30.9 23.913 31.155 23.59 31.58L21.04 34.98C19.918 36.476 18.082 36.476 16.96 34.98L14.41 31.58C14.138 31.206 13.509 30.9 13.05 30.9Z"
          stroke={color || BLACK_MAIN}
          strokeWidth="2.85539"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M25.7941 17.3H25.8096"
          stroke={color || BLACK_MAIN}
          strokeWidth="3.80719"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M18.9923 17.3H19.0081"
          stroke={color || BLACK_MAIN}
          strokeWidth="3.80719"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M12.1907 17.3H12.2064"
          stroke={color || BLACK_MAIN}
          strokeWidth="3.80719"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default MessagesIcon;
