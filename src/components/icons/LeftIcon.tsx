import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const LeftIcon = ({size, style, color = 'black'}: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 320 512"
      style={style}
      fill={color}>
      <Path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
    </Svg>
  );
};

export default LeftIcon;
