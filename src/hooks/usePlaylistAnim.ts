import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import {HEADER_HEIGHT} from '../components/ShuffleButton';
import {OFFSET_TOP} from '../screens/SpotifyScreen';

const {height, width} = Dimensions.get('window');

export const ratio = (width / 414 / height) * 1000;

const usePlaylistAnim = (offsetY: Animated.SharedValue<number>) => {
  const scrollY = offsetY;
  const animations = useAnimatedStyle(() => {
    const opacityAnim = interpolate(scrollY.value, [0, 220], [1, 0.3], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    const heightAnim = interpolate(scrollY.value, [0, 220], [60, 14], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      opacity: opacityAnim,
      height: `${heightAnim}%`,
    };
  });

  const translateAnim = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [HEADER_HEIGHT, (HEADER_HEIGHT + 16) * ratio],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      transform: [{translateY: translateY}],
    };
  });

  const detailCoverAnimation = useAnimatedStyle(() => {
    const scaleAnim = interpolate(scrollY.value, [0, 250], [1, 0.9], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const opacityAnim = interpolate(scrollY.value, [0, 300], [1, 0], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      opacity: opacityAnim,
      transform: [{scaleX: scaleAnim}, {scaleY: scaleAnim}],
    };
  });

  const shuffleBtnAnimation = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, -350 + OFFSET_TOP],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      transform: [{translateY: translateY}],
    };
  });

  return {animations, translateAnim, detailCoverAnimation, shuffleBtnAnimation};
};

export default usePlaylistAnim;
