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
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import useLottieAnim from '../hooks/useLottieAnim';
export type onScrollNativeEventHandler = (
  e: NativeSyntheticEvent<NativeScrollEvent>,
) => void;

const LottieAnimation = () => {
  const {width, height} = useWindowDimensions();
  const scrollY = useSharedValue(0);
  const header = height / 2.8;
  const navBar = StatusBar.currentHeight!! * 3 || 100;

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
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,

      ...(StyleSheet.absoluteFill as any),
    },
    image: {
      flex: 1,
      overflow: 'hidden',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    topHeaderContainer: {
      width,
      flexDirection: 'row',
      alignItems: 'center',
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
      marginLeft: 16,
      marginTop: navBar / 2,
      padding: 8,
      paddingHorizontal: 12,
      borderRadius: 18,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: 'rgba(0,0,0,.50)',
    },
    rightBlurContainer: {
      padding: 8,
      borderRadius: 20,
      marginTop: navBar / 2,
      overflow: 'hidden',
      marginRight: 16,
      backgroundColor: 'rgba(0,0,0,.50)',
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
      textAlign: 'center',
      textAlignVertical: 'center',
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

  const {
    headerAnimation,
    topHeaderContainer,
    innerHeaderAnimations,
    scrollViewAnimation,
  } = useLottieAnim(scrollY, header, navBar);

  return (
    <View style={container}>
      <StatusBar barStyle={'light-content'} />
      <Animated.View style={[headerBg, headerAnimation]}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3MCBV095prILjUacaS81d6qQ-zK1MwcEwkUcvDmUhfw&usqp=CAU&ec=48665698',
          }}
          style={styles.image}
        />
      </Animated.View>
      <Animated.View style={[styles.header, innerHeaderAnimations]}>
        <Animated.View style={[styles.topHeaderContainer, topHeaderContainer]}>
          <View style={styles.leftBlurContainer}>
            <Text style={styles.buttonText}>Upgrade</Text>
            <Image
              source={require('../assets/settings.png')}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          </View>
          <View style={{flex: 1}} />
          <View style={styles.rightBlurContainer}>
            <Image
              source={require('../assets/settings.png')}
              resizeMode="contain"
              style={{width: 24, height: 24}}
            />
          </View>
        </Animated.View>

        <View style={styles.tabs}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Upgrade</Text>
          <Text style={styles.tabText}>Upgrade</Text>
          <Text style={styles.tabText}>Upgrade</Text>
        </View>
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
