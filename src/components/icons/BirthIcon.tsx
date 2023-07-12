import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const LanguageIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(34 * size) / 100}
      height={(34 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M1 33H33"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M25.8968 13.8C28.8408 13.8 31.2248 15.944 31.2248 18.6V33"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M2.77499 33V18.6C2.77499 15.944 5.15899 13.8 8.10299 13.8H19.079"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M6.69687 13.8V9.272C6.69687 7.352 8.42487 5.8 10.5689 5.8H23.4488C25.5768 5.8 27.3048 7.352 27.3048 9.272V13.8"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M30.5523 20.2H29.8323C28.6483 20.2 27.6723 21.16 27.6723 22.36V22.856C27.6723 24.04 26.7123 25.016 25.5123 25.016C24.3283 25.016 23.3523 24.056 23.3523 22.856V22.36C23.3523 21.176 22.3923 20.2 21.1923 20.2C20.0083 20.2 19.0323 21.16 19.0323 22.36V22.856C19.0323 24.04 18.0723 25.016 16.8723 25.016C15.6883 25.016 14.7123 24.056 14.7123 22.856V22.36C14.7603 21.16 13.8003 20.2 12.6162 20.2C11.4322 20.2 10.4562 21.16 10.4562 22.36"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M3.44687 20.168L4.03887 20.184C5.22287 20.2 6.16687 21.16 6.16687 22.344V22.872C6.16687 24.056 7.12687 25.032 8.32687 25.032"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M10.6 5.80001V2.60001"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M23.4 5.80001V2.60001"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 5.8V1"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};

export default LanguageIcon;
