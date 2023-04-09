import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const DetailsCover = ({
  offsetY,
  artistName,
  name,
  imageUrl,
  coverShape,
  username,
  animation,
}: {
  offsetY: number;
  name: string | undefined;
  artistName: string | null | undefined;
  imageUrl: string | undefined;
  coverShape: 'CIRCLE' | 'SQUARE';
  username: string | undefined;
  animation: unknown;
}) => {
  return (
    <Animated.View style={[styles.container, animation]}>
      <FastImage
        style={[styles.cover, {borderRadius: coverShape === 'CIRCLE' ? 83 : 0}]}
        source={{uri: imageUrl}}
      />
      <View style={styles.textContainer}>
        <Text
          numberOfLines={2}
          style={[
            styles.title,
            {
              fontSize: name && name.length > 36 ? 12 : 18,
              marginTop: coverShape === 'SQUARE' ? 0 : 10,
            },
          ]}>
          {name}
        </Text>
        {artistName && coverShape === 'SQUARE' && (
          <Text style={styles.artist}>
            by {artistName === username ? 'you' : artistName}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    height: 165,
    width: 165,
  },
  textContainer: {marginTop: 20, alignItems: 'center'},
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.6,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  artist: {
    marginTop: 5,
    color: '#B9B9B9',
    fontSize: 14,
    letterSpacing: 0.6,
  },
});

export default DetailsCover;
