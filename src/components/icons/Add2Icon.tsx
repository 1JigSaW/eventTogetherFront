import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const Add2Icon = ({size, style, color = 'black'}: Props) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 448 512"
      style={style}
      fill={color}>
      <Path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </Svg>
  );
};

export default Add2Icon;
