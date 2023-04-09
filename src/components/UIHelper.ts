import Animated, {Easing} from 'react-native-reanimated';
import {
  Platform,
  Animated as AnimatedRN,
  Easing as EasingRN,
} from 'react-native';

import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const ratio = (width / 414 / height) * 1000;

const widthRatio = width / 500;
const heightRatio = height / 500;

export const dimensions = {
  height,
  width,
  ratio,
  widthRatio,
  heightRatio,
};

const btnScaleAnim = {
  in: {toValue: 0.98, duration: 50, easing: Easing.inOut(Easing.ease)},
  out: {
    toValue: 1,
    duration: 50,
    easing: Easing.inOut(Easing.ease),
  },
};

const heartScaleAnim = {
  in: {toValue: 0.9, duration: 50, easing: Easing.inOut(Easing.ease)},
  out: {
    toValue: 1,
    duration: 50,
    easing: Easing.inOut(Easing.ease),
  },
};

// Forked from: react-native-iphone-x-helper
// https://github.com/ptelad/react-native-iphone-x-helper
const isIphoneX = () => {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (dimensions.height === 812 ||
      dimensions.width === 812 ||
      dimensions.height === 896 ||
      dimensions.width === 896)
  );
};

const onScroll = (contentOffset: {
  x?: Animated.Node<number>;
  y?: Animated.Node<number>;
}) =>
  Animated.event([
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ]);

const UIHelper = {
  btnScaleAnim,
  isIphoneX,
  onScroll,
  heartScaleAnim,
};

export default UIHelper;
