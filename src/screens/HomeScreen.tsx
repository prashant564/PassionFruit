import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {RootNavigatorProps} from '../navigation';
import {SHUFFLE_BUTTON_HEIGHT} from '../components/ShuffleButton';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {navigate} = useNavigation<RootNavigatorProps>();

  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center', top}}>
      <Pressable
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.button]}
        onPress={() => {
          navigate('SpotifyScreen');
        }}>
        <Text style={styles.btnText}>SPOTIFY THINGYY</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.button]}
        onPress={() => {
          navigate('LottieAnimationScreen');
        }}>
        <Text style={styles.btnText}>Lottie List</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.button]}
        onPress={() => {
          navigate('CardSwipeListScreen');
        }}>
        <Text style={styles.btnText}>Card Swipe List</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.button]}
        onPress={() => {
          navigate('FlipCardAnimationScreen');
        }}>
        <Text style={styles.btnText}>Flip Cards</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    width: 230,
    height: SHUFFLE_BUTTON_HEIGHT,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
    marginVertical: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});
