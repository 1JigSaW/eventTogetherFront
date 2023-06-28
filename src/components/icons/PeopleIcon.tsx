import React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {StyleProp, ViewStyle} from 'react-native';
import {BLACK_MAIN} from '../../../colors';

interface Props {
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
}

const PeopleIcon = ({size, style, color}: Props) => {
  return (
    <Svg
      width={(20 * size) / 100}
      height={(20 * size) / 100}
      style={style}
      fill={'none'}>
      <G scale={size / 100}>
        <Path
          d="M6.9175 0C4.34273 0 2.24951 2.09322 2.24951 4.66798C2.24951 7.19361 4.22481 9.23769 6.79957 9.32614C6.87819 9.31631 6.95681 9.31631 7.01577 9.32614H7.06491H7.08456C9.60036 9.23769 11.5757 7.19361 11.5855 4.66798C11.5855 2.09322 9.49226 0 6.9175 0Z"
          fill={color || BLACK_MAIN}
        />
        <Path
          d="M11.9107 11.9392C9.16886 10.1113 4.69747 10.1113 1.93598 11.9392C0.687913 12.7745 0 13.9046 0 15.1134C0 16.3221 0.687913 17.4425 1.92616 18.268C3.30198 19.1917 5.11021 19.6536 6.91844 19.6536C8.72663 19.6536 10.5349 19.1917 11.9107 18.268C13.1489 17.4326 13.8368 16.3123 13.8368 15.0937C13.827 13.885 13.1489 12.7646 11.9107 11.9392Z"
          fill={color || BLACK_MAIN}
        />
        <Path
          d="M17.7171 5.24599C17.8744 7.15249 16.5182 8.82309 14.6412 9.04912C14.6313 9.04912 14.6313 9.04912 14.6215 9.04912H14.592C14.5331 9.04912 14.4741 9.04912 14.425 9.06878C13.4717 9.11791 12.5971 8.81326 11.9387 8.25311C12.9509 7.34904 13.5307 5.99287 13.4128 4.51877C13.344 3.72275 13.0688 2.99553 12.6561 2.37641C13.0295 2.18969 13.4619 2.07176 13.9041 2.03245C15.8303 1.86539 17.5501 3.30018 17.7171 5.24599Z"
          fill={color || BLACK_MAIN}
        />
        <Path
          d="M19.6816 14.3385C19.603 15.2917 18.9937 16.1172 17.9716 16.6774C16.9889 17.2179 15.7506 17.4734 14.5222 17.4439C15.2298 16.8052 15.6425 16.0091 15.7212 15.164C15.8194 13.9454 15.2396 12.7759 14.08 11.8424C13.4216 11.3215 12.655 10.9088 11.8197 10.6041C13.9915 9.97516 16.7235 10.3977 18.404 11.7539C19.3081 12.4811 19.77 13.3951 19.6816 14.3385Z"
          fill={color || BLACK_MAIN}
        />
      </G>
    </Svg>
  );
};

export default PeopleIcon;