/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import PlaylistTitle from './src/components/PlaylistTitle';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import usePlaylistAnim, {ratio} from './src/hooks/usePlaylistAnim';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import DetailsCover from './src/components/DetailsCover';
import ShuffleButton, {HEADER_HEIGHT} from './src/components/ShuffleButton';
import UIHelper, {dimensions} from './src/components/UIHelper';
import ImageColors from 'react-native-image-colors';

const initialState = {
  dominantColor: '#121212',
  isLoading: true,
};

const OFFSET_TOP =
  (UIHelper.isIphoneX() ? HEADER_HEIGHT * 2 : HEADER_HEIGHT) * ratio + 20;

export const data = [
  {type: 'hawk'},
  {type: 'flamingo'},
  {type: 'finch'},
  {type: 'duck'},
  {type: 'penguin'},
  {type: 'canary'},
  {type: 'duck'},
  {type: 'owl'},
  {type: 'seagull'},
  {type: 'hummingbird'},
  {type: 'sparrow'},
  {type: 'eagle'},
  {type: 'flamingo'},
  {type: 'pelican'},
  {type: 'owl'},
  {type: 'turkey'},
  {type: 'owl'},
  {type: 'owl'},
  {type: 'seagull'},
  {type: 'penguin'},
];

function App(): JSX.Element {
  const scrollY = useSharedValue(0);

  //   const {animations, translateAnim} = usePlaylistAnim(Math.abs(scrollY.value));
  const [{isLoading, dominantColor}, setState] = useState(initialState);
  const [scrollViewHeight, setScrollViewHeight] = useState<number>(100);
  const {top} = useSafeAreaInsets();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  useEffect(() => {
    (async () => {
      const colors = await ImageColors.getColors(
        'https://i.scdn.co/image/ab67616d0000b27354e544672baa16145d67612b',
        {fallback: '#228B22', cache: true},
      );

      if (colors.platform === 'android') {
        setState({
          dominantColor: colors.average!!,
          isLoading: false,
        });
      } else {
        setState({
          dominantColor: colors.background!!,
          isLoading: false,
        });
      }
    })();
  }, []);

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
      //   transform: [{scale: scale}],
    };
  });

  const translateAnim = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, 300], [0, 54 * ratio], {
      extrapolateRight: Extrapolate.CLAMP,
    });

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

  return (
    <SafeAreaView style={{backgroundColor: '#121212', flex: 1, top}}>
      <PlaylistTitle name={'Prashant ke gaane'} />
      <Animated.View style={[styles.gradientContainer, animations]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.7}}
          colors={[dominantColor, '#121212']}
          style={styles.gradient}
        />
      </Animated.View>
      <View style={styles.coverContainer}>
        <DetailsCover
          coverShape="SQUARE"
          offsetY={scrollY.value}
          name={'Prashant ke gaane'}
          imageUrl={
            'https://i.scdn.co/image/ab67616d0000b27354e544672baa16145d67612b'
          }
          artistName={'Mr. Dixit'}
          username={'AemonSythe'}
          animation={detailCoverAnimation}
        />
      </View>
      <ShuffleButton offsetY={scrollY.value} animation={shuffleBtnAnimation} />
      <Animated.ScrollView
        onLayout={e => setScrollViewHeight(e.nativeEvent.layout.height)}
        bounces={false}
        decelerationRate={0.994}
        overScrollMode="never"
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        style={[translateAnim]}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: scrollViewHeight,
          },
        ]}>
        {data.map((item, index) => {
          return (
            <View
              key={index.toString()}
              style={{marginVertical: 12, alignItems: 'center'}}>
              <Text style={{color: 'white'}}>{item.type}</Text>
            </View>
          );
        })}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const ProvidedApp = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <App />
    </SafeAreaProvider>
  );
};

export default ProvidedApp;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  gradientContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    alignSelf: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
  coverContainer: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 90,
  },
  scrollContent: {
    marginTop: 360,
    zIndex: 5,
  },
});
