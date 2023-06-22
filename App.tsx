/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  RootNavigator,
  useBackButtonHandler,
  useNavigationPersistence,
  canExit,
} from './src/navigation';
import * as storage from './src/utils/storageUtils';

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

function App(): JSX.Element {
  useBackButtonHandler(canExit);
  const {
    // initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  return <RootNavigator onStateChange={onNavigationStateChange} />;
}

const ProvidedApp = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default ProvidedApp;
