import {
  View,
  Text,
  useWindowDimensions,
  StatusBar,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';

export type onScrollNativeEventHandler = (
  e: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const LottieAnimation = () => {
  const {width, height} = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const header = height / 2.8;
  const navBar = StatusBar.currentHeight || 100;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f5f7',
    },
    headerBg: {
      zIndex: 100,
      borderRadius: 20,
      ...(StyleSheet.absoluteFill as any),
    },
    header: {
      zIndex: 101,
      borderRadius: 20,
      backgroundColor: 'rgba(0,0,0,0.25)',
      ...(StyleSheet.absoluteFill as any),
      paddingTop: navBar,
    },
    topHeaderContainer: {
      width,
      position: 'absolute',
    },
    content: {
      marginBottom: 20,
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
      borderColor: '#ddd',
      backgroundColor: '#fff',
    },
    caption: {
      padding: 15,
    },
    containerr: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      color: 'green',
    },
    leftBlurContainer: {
      left: 16,
      padding: 8,
      paddingHorizontal: 12,
      borderRadius: 18,
      position: 'absolute',
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      top: navBar / 2,
      backgroundColor: 'rgba(0,0,0,.25)',
    },
    rightBlurContainer: {
      position: 'absolute',
      padding: 8,
      borderRadius: 16,
      overflow: 'hidden',
      right: 15,
      top: navBar / 2,
      backgroundColor: 'rgba(0,0,0,.25)',
    },
    tabs: {
      position: 'absolute',
      borderRadius: 24,
      backgroundColor: 'rgba(0,0,0,.25)',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 16,
      left: 16,
      right: 16,
      flexDirection: 'row',
    },
    tabText: {
      color: 'rgba(255,255,255,0.65)',
      fontSize: 14,
      fontWeight: '700',
      padding: 12,
      borderRadius: 24,
      overflow: 'hidden',
      textAlign: 'center',
      flex: 1,
    },
    tabTextActive: {
      color: 'white',
      backgroundColor: 'rgba(155, 89, 182,0.75)',
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 18,
      paddingRight: 10,
    },
  });

  const {container, headerBg} = styles;

  const scrollHandler: onScrollNativeEventHandler = useAnimatedScrollHandler(
    event => {
      scrollY.value = event.contentOffset.y;
      if (scrollY.value > 150) {
        runOnJS(StatusBar.setBarStyle)('light-content', true);
      } else {
        runOnJS(StatusBar.setBarStyle)('light-content', true);
      }
    },
  );

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

  return (
    <View style={container}>
      <StatusBar barStyle={'light-content'} />
      <Animated.View style={[headerBg, headerAnimation]}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTika-QN2h6uMlZprq2SGbMW5YFSX39j9sS0Z6NcN7vsA&usqp=CAU&ec=48665698',
          }}
          style={{flex: 1}}
        />
      </Animated.View>
      <Animated.View style={[styles.header, innerHeaderAnimations]}>
        <Animated.View style={[styles.topHeaderContainer, topHeaderContainer]}>
          <BlurView
            style={styles.leftBlurContainer}
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="white">
            <Text style={styles.buttonText}>Upgrade</Text>
            <Image
              source={require('../assets/settings.png')}
              resizeMode="contain"
              style={{width: 18, height: 18}}
            />
          </BlurView>
          <BlurView
            style={styles.rightBlurContainer}
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="white">
            <Image
              source={require('../assets/settings.png')}
              resizeMode="contain"
              style={{width: 18, height: 18}}
            />
          </BlurView>
        </Animated.View>

        <BlurView
          style={styles.tabs}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white">
          <Text style={[styles.tabText, styles.tabTextActive]}>Upgrade</Text>
          <Text style={styles.tabText}>Upgrade</Text>
          <Text style={styles.tabText}>Upgrade</Text>
        </BlurView>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        decelerationRate={0.994}
        overScrollMode="never"
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={8}
        style={scrollViewAnimation}
        contentContainerStyle={{padding: 10, paddingTop: header}}>
        {[...Array(20).keys()].map((item, index) => {
          return (
            <Pressable
              key={index.toString()}
              style={styles.content}
              onPress={() => Alert.alert('Content')}>
              <Text style={styles.caption}>Content {item + 1}</Text>
            </Pressable>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default LottieAnimation;
