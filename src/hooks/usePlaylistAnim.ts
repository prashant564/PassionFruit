import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const ratio = (width / 414 / height) * 1000;

const widthRatio = width / 500;
const heightRatio = height / 500;

const usePlaylistAnim = (offsetY: any) => {
  const scaleY = useSharedValue(offsetY);
  const animations = useAnimatedStyle(() => {
    const opacityAnim = interpolate(scaleY.value, [0, 220], [1, 0.3], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    const heightAnim = interpolate(scaleY.value, [0, 300], [60, 14], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      opacity: opacityAnim,
      height: `${heightAnim}%`,
      //   transform: [{scale: scale}],
    };
  });

  const translateAnim = useAnimatedStyle(() => {
    const translateY = interpolate(offsetY, [0, 300], [0, 54 * ratio], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      transform: [{translateY: translateY}],
    };
  });

  //   const opacityAnim = useRef(
  //     offsetY.interpolate({
  //       inputRange: [0, 220],
  //       outputRange: [1, 0.3],
  //       extrapolate: Animated.Extrapolate.CLAMP,
  //     }),
  //   ).current;

  //   const heightAnim = useRef(
  //     offsetY.interpolate({
  //       inputRange: [0, 300],
  //       outputRange: [60, 14],
  //       extrapolate: Animated.Extrapolate.CLAMP,
  //     }),
  //   ).current;

  //   const translateAnim = useRef(
  //     offsetY.interpolate({
  //       inputRange: [0, 300],
  //       outputRange: [0, 54 * dimensions.ratio],
  //       extrapolate: Animated.Extrapolate.CLAMP,
  //     }),
  //   ).current;

  return {animations, translateAnim};
};

export default usePlaylistAnim;
