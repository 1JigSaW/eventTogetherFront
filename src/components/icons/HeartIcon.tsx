import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const HeartIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(18 * size) / 100}
      height={(20 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M12.9797 0C11.3528 0 9.89661 0.791009 8.98874 2.00449C8.08088 0.791009 6.6247 0 4.99774 0C2.2382 0 0 2.24719 0 5.02471C0 6.09437 0.170786 7.08317 0.467415 8.00002C1.88764 12.4944 6.26515 15.182 8.43144 15.9191C8.73706 16.027 9.24043 16.027 9.54605 15.9191C11.7123 15.182 16.0899 12.4944 17.5101 8.00002C17.8067 7.08317 17.9775 6.09437 17.9775 5.02471C17.9775 2.24719 15.7393 0 12.9797 0Z"
          fill={color || BLACK_MAIN}
        />
      </G>
    </Svg>
  );
};

export default HeartIcon;
