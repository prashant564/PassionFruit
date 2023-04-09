import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ratio} from '../hooks/usePlaylistAnim';

import UIHelper from './UIHelper';

export const SHUFFLE_BUTTON_HEIGHT = 50;
const TOP = 346;
export const HEADER_HEIGHT = 42;

const OFFSET_TOP =
  (UIHelper.isIphoneX() ? HEADER_HEIGHT * 2 : HEADER_HEIGHT) * ratio + 20;

const ShuffleButton = ({
  offsetY,
  animation,
}: {
  offsetY: number;
  animation: unknown;
}) => {
  //   const shuffleBtnAnimation = useAnimatedStyle(() => {
  //     const translateY = interpolate(offsetY, [0, 300], [0, -350 + OFFSET_TOP], {
  //       extrapolateRight: Extrapolate.CLAMP,
  //     });

  //     return {
  //       transform: [{translateY: translateY}],
  //     };
  //   });

  return (
    <Animated.View style={[styles.container, animation]}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnText}>SHUFFLE PLAY</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: TOP,
    alignItems: 'center',
    height: SHUFFLE_BUTTON_HEIGHT,
    zIndex: 1,
  },
  button: {
    width: 230,
    height: SHUFFLE_BUTTON_HEIGHT,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});

export default ShuffleButton;
