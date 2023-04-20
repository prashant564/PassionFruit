import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const useLottieAnim = (
  scrollY: Animated.SharedValue<number>,
  header: number,
  navBar: number,
) => {
  const headerAnimation = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      scrollY.value,
      [-100, 0, header - navBar],
      [header + 75, header - 25, navBar + 10],
      {extrapolateRight: Extrapolate.CLAMP},
    );

    return {
      height: heightAnim,
    };
  });

  const innerHeaderAnimations = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      scrollY.value,
      [-100, 0, header - navBar],
      [header + 75, header - 25, navBar + 10],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      height: heightAnim,
    };
  });

  const topHeaderContainer = useAnimatedStyle(() => {
    const opacityAnim = interpolate(
      scrollY.value,
      [-100, 0, header - navBar - 30],
      [1, 1, 0],
      {
        extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      opacity: opacityAnim,
    };
  });

  const scrollViewAnimation = useAnimatedStyle(() => {
    const zIndex = scrollY.value > 100 ? 99 : 100;

    return {zIndex};
  });

  return {
    headerAnimation,
    topHeaderContainer,
    innerHeaderAnimations,
    scrollViewAnimation,
  };
};

export default useLottieAnim;
