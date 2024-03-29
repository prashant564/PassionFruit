import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {Colors} from '../utils/colors';

interface CardProps {
  color: string;
  style: object;
}

const FlipCard: FC<CardProps> = ({color, style}) => {
  const getColor = () => {
    switch (color) {
      case Colors.LIGHT_BLUE:
        return Colors.DARK_BLUE;
      case Colors.LIGHT_RED:
        return Colors.DARK_RED;
      case Colors.LIGHT_GOLD:
        return Colors.DARK_GOLD;
    }
  };

  return (
    <Animated.View style={style}>
      <View style={cardStyle.spacer} />
      <View style={cardStyle.container}>
        <View style={[cardStyle.circle, {backgroundColor: getColor()}]} />
        <View>
          <View style={[cardStyle.topLine, {backgroundColor: getColor()}]} />
          <View style={[cardStyle.bottomLine, {backgroundColor: getColor()}]} />
        </View>
      </View>
    </Animated.View>
  );
};

const cardStyle = StyleSheet.create({
  spacer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 20,
    marginLeft: 15,
  },
  topLine: {
    height: 20,
    width: 120,
    borderRadius: 40,
    marginBottom: 20,
    marginLeft: 15,
  },
  bottomLine: {
    height: 20,
    width: 60,
    borderRadius: 40,
    marginBottom: 20,
    marginLeft: 15,
  },
});

export default FlipCard;
