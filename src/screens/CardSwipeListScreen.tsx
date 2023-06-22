/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Text,
} from 'react-native';

const {width} = Dimensions.get('window');
export const CARD_WIDTH = width * 0.7;
export const CARD_HEIGHT = CARD_WIDTH * 1.4;
export const CARD_COUNT = 10;

const BirdCard: React.FC = () => {
  const pan = React.useRef(new Animated.ValueXY()).current;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [swipedIndices, setSwipedIndices] = React.useState<number[]>([]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      pan.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 120) {
        // Right swipe
        handleSwipeRight();
      } else if (gestureState.dx < -120) {
        // Left swipe
        handleSwipeLeft();
      } else {
        // Snap back to center
        resetPosition();
      }
    },
  });

  const handleSwipeRight = React.useCallback(() => {
    if (currentIndex > 0 && currentIndex < CARD_COUNT - 1) {
      handleCardDisappear();
      setCurrentIndex(currentIndex + 1);
    }
    // resetPosition();
  }, [currentIndex]);

  const handleSwipeLeft = React.useCallback(() => {
    if (currentIndex > 0 && currentIndex < CARD_COUNT - 1) {
      setCurrentIndex(currentIndex + 1);
      handleCardDisappear();
    }
    // if (currentIndex === 0) {
    //   handleCardDisappear();
    // }
    // resetPosition();
  }, [currentIndex]);

  const resetPosition = React.useCallback(() => {
    Animated.spring(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  }, [pan]);

  const rotateCard = pan.x.interpolate({
    inputRange: [-150, 0, 150],
    outputRange: ['-45deg', '0deg', '45deg'],
    extrapolate: 'clamp',
  });

  const animatedCardStyles = {
    transform: [{translateX: pan.x}, {translateY: pan.y}, {rotate: rotateCard}],
  };

  const handleCardDisappear = React.useCallback(() => {
    setSwipedIndices(prevIndices => [...prevIndices, currentIndex]);
    handleSwipeRight();
  }, [currentIndex, handleSwipeRight]);

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        animatedCardStyles,
        {zIndex: -currentIndex},
        swipedIndices.includes(currentIndex) && {display: 'none'},
      ]}
      {...panResponder.panHandlers}>
      <View style={[styles.card]} />
      <Text style={styles.cardText}>Card {currentIndex + 1}</Text>
      <View style={styles.likeButton}>
        <Text style={styles.likeText}>LIKE</Text>
      </View>
      <View style={styles.unlikeButton}>
        <Text style={styles.unlikeText}>UNLIKE</Text>
      </View>
    </Animated.View>
  );
};

const CardSwipeListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {Array.from({length: CARD_COUNT}).map((_, index) => (
          <BirdCard key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'blue',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  likeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 8,
  },
  likeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  unlikeButton: {
    position: 'absolute',
    bottom: 20,
    right: 100,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  unlikeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CardSwipeListScreen;
