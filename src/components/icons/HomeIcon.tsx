import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const HomeIcon = ({size, style, color}: Props) => {
  return (
    <Svg width={(48 * size) / 100} height={(48 * size) / 100} style={style}>
      <G scale={size / 100}>
        <Path d="M231.769-190.769h149.539v-247h198.384v247h148.539v-372.846L480-751.462 231.769-564.205v373.436ZM188-147v-439l292-219.539L772-586v439H535.923v-247H425.077v247H188Zm292-324.231Z" />
      </G>
    </Svg>
  );
};

export default HomeIcon;
