import {
  NavigationContainer,
  NavigationContainerRefWithCurrent,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import CardSwipeListScreen from '../screens/CardSwipeListScreen';
import HomeScreen from '../screens/HomeScreen';
import LottieAnimation from '../screens/LottieAnimation';
import SpotifyScreen from '../screens/SpotifyScreen';
import {navigationRef} from './navigation-utilities';

export interface RootNavigatorProps {
  HomeScreen: undefined;
  SpotifyScreen: undefined;
  LottieAnimationScreen: undefined;
  CardSwipeListScreen: undefined;
}

const Stack = createNativeStackNavigator<RootNavigatorProps>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: true}}
      initialRouteName={'HomeScreen'}>
      <>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name={'SpotifyScreen'} component={SpotifyScreen} />
        <Stack.Screen
          name="LottieAnimationScreen"
          component={LottieAnimation}
        />
        <Stack.Screen
          name="CardSwipeListScreen"
          component={CardSwipeListScreen}
        />
      </>
    </Stack.Navigator>
  );
};

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const RootNavigator = (props: NavigationProps) => {
  const [ready, setReady] = useState(false);

  return (
    <NavigationContainer
      {...props}
      onReady={() => {
        setReady(true);
      }}
      ref={navigationRef as NavigationContainerRefWithCurrent<{}>}>
      {ready && <RootStack />}
    </NavigationContainer>
  );
};

RootNavigator.displayName = 'RootNavigator';
