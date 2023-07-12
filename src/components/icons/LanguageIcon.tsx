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
      width={(33 * size) / 100}
      height={(33 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M27.4419 26.8383L24.1249 20.2198L20.8079 26.8383"
          fill="white"
        />
        <Path
          d="M27.4419 26.8383L24.1249 20.2198L20.8079 26.8383"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path d="M21.4133 25.6608H26.8693H21.4133Z" fill="white" />
        <Path
          d="M21.4133 25.6608H26.8693"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M24.1257 31.9997C19.7857 31.9997 16.2517 28.4812 16.2517 24.1257C16.2517 19.7857 19.7702 16.2517 24.1257 16.2517C28.4657 16.2517 31.9997 19.7702 31.9997 24.1257C31.9997 28.4812 28.4812 31.9997 24.1257 31.9997Z"
          fill="white"
          stroke={BLACK_MAIN || color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M5.681 1H11.757C14.9655 1 16.5155 2.55003 16.438 5.68103V11.757C16.5155 14.9655 14.9655 16.5155 11.757 16.438H5.681C2.55 16.5 1 14.95 1 11.7415V5.66551C1 2.55002 2.55 1 5.681 1Z"
          fill="white"
          stroke={BLACK_MAIN || color}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path d="M11.8643 6.96765H5.57129H11.8643Z" fill="white" />
        <Path
          d="M11.8643 6.96765H5.57129"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <Path d="M8.70154 5.91338V6.96736V5.91338Z" fill="white" />
        <Path
          d="M8.70154 5.91338V6.96736"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M10.2837 6.95177C10.2837 9.66427 8.16015 11.8653 5.55615 11.8653L10.2837 6.95177Z"
          fill="white"
        />
        <Path
          d="M10.2837 6.95177C10.2837 9.66427 8.16015 11.8653 5.55615 11.8653"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M11.8657 11.8655C10.7342 11.8655 9.71123 11.261 8.99823 10.3L11.8657 11.8655Z"
          fill="white"
        />
        <Path
          d="M11.8657 11.8655C10.7342 11.8655 9.71123 11.261 8.99823 10.3"
          stroke={BLACK_MAIN || color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <G>
          <Path
            d="M1 21.15C1 27.1485 5.8515 32 11.85 32L10.2225 29.2875"
            fill="white"
          />
          <Path
            d="M1 21.15C1 27.1485 5.8515 32 11.85 32L10.2225 29.2875"
            stroke={BLACK_MAIN || color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
        <G>
          <Path
            d="M32 11.85C32 5.8515 27.1485 1 21.15 1L22.7775 3.7125"
            fill="white"
          />
          <Path
            d="M32 11.85C32 5.8515 27.1485 1 21.15 1L22.7775 3.7125"
            stroke={BLACK_MAIN || color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
  );
};

export default LanguageIcon;
