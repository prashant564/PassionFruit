import {Dimensions, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import FlipCard from '../components/FlipCard';
import {Colors} from '../utils/colors';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

interface CardContainerProps {
  color: string;
  priority: Animated.SharedValue<number>;
  firstPriority: Animated.SharedValue<number>;
  secondPriority: Animated.SharedValue<number>;
  thirdPriority: Animated.SharedValue<number>;
}

const CardContainer: FC<CardContainerProps> = ({
  color,
  priority,
  firstPriority,
  secondPriority,
  thirdPriority,
}) => {
  const BOTTOM_BUFFER = 30;
  const yTranslation = useSharedValue(BOTTOM_BUFFER);
  const rotation = useSharedValue(BOTTOM_BUFFER);
  const isRightFlick = useSharedValue(true);

  const gesture = Gesture.Pan()
    .onBegin(({absoluteX, translationY}) => {
      if (absoluteX < width / 2) {
        isRightFlick.value = false;
      }
      yTranslation.value = translationY + BOTTOM_BUFFER;
      rotation.value = translationY + BOTTOM_BUFFER;
    })
    .onUpdate(({translationY}) => {
      yTranslation.value = translationY + BOTTOM_BUFFER;
      rotation.value = translationY + BOTTOM_BUFFER;
    })
    .onEnd(() => {
      const priorties = [
        firstPriority.value,
        secondPriority.value,
        thirdPriority.value,
      ];

      console.log('priorities', priorties.toString());

      const lastItem = priorties[priorties.length - 1];

      for (let i = priorties.length - 1; i >= 0; i--) {
        priorties[i] = priorties[i - 1];
      }

      priorties[0] = lastItem;

      console.log('updated_priorities', priorties.toString());

      firstPriority.value = priorties[0];
      secondPriority.value = priorties[1];
      thirdPriority.value = priorties[2];

      yTranslation.value = withTiming(
        BOTTOM_BUFFER,
        {
          duration: 400,
          easing: Easing.quad,
        },
        () => {
          isRightFlick.value = true;
        },
      );
      rotation.value = withTiming(
        -1280,
        {
          duration: 400,
          easing: Easing.linear,
        },
        () => {
          rotation.value = 30;
        },
      );
    });

  const style = useAnimatedStyle(() => {
    const getPosition = () => {
      switch (priority.value) {
        case 1:
          return 50;
        case 0.9:
          return 75;
        case 0.8:
          return 100;
        default:
          return 0;
      }
    };

    return {
      position: 'absolute',
      height: 200,
      width: 325,
      backgroundColor: color,
      bottom: withTiming(getPosition(), {duration: 500}),
      zIndex: priority.value * 100,
      borderRadius: 8,
      transform: [
        {translateY: yTranslation.value},
        {
          rotate: `${interpolate(
            rotation.value,
            isRightFlick.value ? [30, height] : [30, -height],
            [0, 4],
          )}rad`,
        },
        {
          scale: withTiming(priority.value, {duration: 500}),
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <FlipCard color={color} style={style} />
    </GestureDetector>
  );
};

const FlipCardAnimationScreen = () => {
  const firstPriority = useSharedValue(1);
  const secondPriority = useSharedValue(0.9);
  const thirdPriority = useSharedValue(0.8);

  return (
    <GestureHandlerRootView style={styles.rootViewStyle}>
      <View style={styles.container}>
        <CardContainer
          color={Colors.LIGHT_BLUE}
          priority={thirdPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
        />
        <CardContainer
          color={Colors.LIGHT_RED}
          priority={secondPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
        />
        <CardContainer
          color={Colors.LIGHT_GOLD}
          priority={firstPriority}
          firstPriority={firstPriority}
          secondPriority={secondPriority}
          thirdPriority={thirdPriority}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default FlipCardAnimationScreen;

const styles = StyleSheet.create({
  rootViewStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30,
  },
});
