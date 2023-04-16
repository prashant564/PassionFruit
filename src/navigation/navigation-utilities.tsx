import {useState, useEffect, useRef} from 'react';
import {
  BackHandler,
  // Linking
} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
import {
  PartialState,
  NavigationState,
  NavigationAction,
  createNavigationContainerRef,
  // LinkingOptions,
  // getStateFromPath,
} from '@react-navigation/native';
// import notifee from '@notifee/react-native';

// import {useMount} from 'utils/customHooks';
// import {openInBrowser} from 'utils/browser';
// import {devLogger} from 'utils/logger';
// import {triggerScreenAnalytics} from 'utils/analytics';

const exitRoutes = ['HomeScreen'];

export const canExit = (routeName: string): boolean =>
  exitRoutes.includes(routeName);

export const RootNavigation = {
  navigate(_name: string, _params?: any) {},
  goBack() {},
  resetRoot(_state?: PartialState<NavigationState> | NavigationState) {},
  getRootState(): NavigationState {
    return {} as any;
  },
  dispatch(_action: NavigationAction) {},
};

export const navigationRef = createNavigationContainerRef();

/**
 * Gets the current screen from any navigation state.
 */
export function getActiveRouteName(
  state: NavigationState | PartialState<NavigationState>,
): NavigationState | string {
  const route = state.routes[state.index || 0];

  // Found the active route -- return the name
  if (!route.state) {
    return route.name;
  }

  // Recursive call to deal with nested routers
  return getActiveRouteName(route.state);
}

/**
 * Hook that handles Android back button presses and forwards those on to
 * the navigation or allows exiting the app.
 */
export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    // We'll fire this when the back button is pressed on Android.
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      // grab the current route
      const routeName = getActiveRouteName(navigationRef.getRootState());

      // are we allowed to exit?
      if (canExitRef.current(routeName as string)) {
        // let the system know we've not handled this event
        return false;
      }

      // we can't exit, so let's turn this into a back action
      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    // Subscribe when we come to life
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Unsubscribe when we're done
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

/**
 * Custom hook for persisting navigation state.
 */
export function useNavigationPersistence(storage: any, persistenceKey: string) {
  const [initialNavigationState, setInitialNavigationState] = useState();

  // This feature is particularly useful in development mode.
  // It is selectively enabled in development mode with
  // the following approach. If you'd like to use navigation persistence
  // in production, remove the __DEV__ and set the state to true
  const [isRestored, setIsRestored] = useState(!__DEV__);

  const routeNameRef = useRef<string | undefined>();

  const onNavigationStateChange = (state: any) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = getActiveRouteName(state);

    if (previousRouteName !== currentRouteName) {
      // track screens.
      //   triggerScreenAnalytics(currentRouteName);

      __DEV__ && console.log(currentRouteName);
    }

    // Save the current route name for later comparision
    routeNameRef.current = currentRouteName as string;

    // Persist state to storage
    storage.save(persistenceKey, state);
  };

  const restoreState = async () => {
    try {
      const state = await storage.load(persistenceKey);
      if (state) {
        setInitialNavigationState(state);
      }
    } finally {
      setIsRestored(true);
    }
  };

  useEffect(() => {
    async () => {
      if (!isRestored) {
        try {
          const state = await storage.load(persistenceKey);
          if (state) {
            setInitialNavigationState(state);
          }
        } finally {
          setIsRestored(true);
        }
      }
    };
  }, [isRestored, persistenceKey, storage]);

  return {
    onNavigationStateChange,
    restoreState,
    isRestored,
    initialNavigationState,
  };
}

/**
 * use this to navigate to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * More info: https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(params = {index: 0, routes: []}) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(params);
  }
}

// export const linking: LinkingOptions<{}> = {
//   prefixes: ['https://bitbnspay.com', 'bitbnspay://'],
//   config: {
//     screens: {
//       primaryStack: {
//         // initialRouteName: 'Dashboard',
//         screens: {
//           BuySellScreen: {
//             path: 'trade/:coin/:type?',
//           },
//           TransferContactLoadingScreen: {
//             path: 'send/:phone',
//           },
//           KycScreen: {
//             path: 'profile/kyc',
//           },
//           AddNumberToPay: {
//             path: 'contacts/search/:phone?',
//           },
//           HistoryScreen: {
//             path: 'history/trades',
//           },
//           BankAccountsScreen: {
//             path: 'profile/bank-accounts/view',
//           },
//           AddBankAccountScreen: {
//             path: 'profile/bank-accounts/add',
//           },
//           AddInrScreen: {
//             path: 'inr/deposit',
//           },
//           WithdrawInrScreen: {
//             path: 'inr/withdraw',
//           },
//           NotificationsScreen: {
//             path: 'notifications',
//           },
//           CoinScreen: {
//             path: 'coin/:coin',
//           },
//           ScanQRScreen: {
//             path: 'qr/scan',
//           },
//           ShowQRScreen: {
//             path: 'qr/show',
//           },
//           LanguageScreen: {
//             path: 'language',
//           },
//           RedeemVoucherScreen: {
//             path: 'redeem-voucher',
//           },
//           Lost404Screen: '*',
//         },
//       },
//     },
//   },
//   getStateFromPath: (path, options) => {
//     console.log(path, getStateFromPath(path, options)?.routes[0].state);

//     return getStateFromPath(path, options);
//   },
//   subscribe(listener: (url: string) => void) {
//     const onReceiveURL = ({url}: {url: string}) => {
//       devLogger('onReceiveURL', url);
//       if (url) {
//         // Any custom logic to check whether the URL needs to be handled
//         //...

//         // return listener(url);

//         Linking.canOpenURL(url).then(can => {
//           if (can) {
//             Linking.openURL(url);
//           } else {
//             openInBrowser(url);
//           }
//         });
//       }
//     };

//     // Listen to incoming links from deep linking
//     const urlSub = Linking.addEventListener('url', onReceiveURL);
//     // Listen to firebase push notifications
//     const unsubscribeNotification = messaging().onNotificationOpenedApp(
//       message => {
//         const url = message?.data?.url;
//         devLogger('onNotificationOpenedApp', [url, message]);
//         if (url) {
//           // Any custom logic to check whether the URL needs to be handled
//           //...
//           Linking.canOpenURL(url).then(can => {
//             if (can) {
//               Linking.openURL(url);
//             } else {
//               openInBrowser(url);
//             }
//           });
//           // if (url.startsWith('http')) {
//           // 	openInBrowser(url);
//           // } else {
//           // 	// Call the listener to let React Navigation handle the URL
//           // 	setTimeout(() => {
//           // 		listener(url);
//           // 	}, 1000);
//           // }
//         }
//       },
//     );
//     messaging()
//       .getInitialNotification()
//       .then(message => {
//         const url = message?.data?.url;
//         devLogger('getInitialNotification', [url, message]);
//         if (url) {
//           // Any custom logic to check whether the URL needs to be handled
//           //...

//           // if (url.startsWith('http')) {
//           Linking.canOpenURL(url).then(can => {
//             if (can) {
//               Linking.openURL(url);
//             } else {
//               openInBrowser(url);
//             }
//           });
//           // } else {
//           // 	// Call the listener to let React Navigation handle the URL
//           // 	setTimeout(() => {
//           // 		listener(url);
//           // 	}, 1000);
//           // }
//         }
//       })
//       .catch(console.log);

//     notifee
//       .getInitialNotification()
//       .then(message => {
//         if (message) {
//           const url = message.notification.data?.url;
//           devLogger('notifee getInitialNotification', [url, message]);
//           if (url) {
//             // Any custom logic to check whether the URL needs to be handled
//             //...

//             // if (url.startsWith('http')) {
//             Linking.canOpenURL(url).then(can => {
//               if (can) {
//                 Linking.openURL(url);
//               } else {
//                 openInBrowser(url);
//               }
//             });
//             // } else {
//             // 	// Call the listener to let React Navigation handle the URL
//             // 	setTimeout(() => {
//             // 		listener(url);
//             // 	}, 1000);
//             // }
//           }
//         }
//       })
//       .catch(console.log);

//     return () => {
//       // Clean up the event listeners
//       urlSub.remove();
//       // Linking.removeEventListener('url', onReceiveURL);
//       unsubscribeNotification();
//     };
//   },
// };

// export const useInitialURL = () => {
//   const [url, setUrl] = useState<string | null>();
//   const [processing, setProcessing] = useState(true);

//   useMount(() => {
//     const getUrlAsync = async () => {
//       // Get the deep link used to open the app
//       const initialUrl = await Linking.getInitialURL();

//       // The setTimeout is just for testing purpose
//       setTimeout(() => {
//         setUrl(initialUrl);
//         setProcessing(false);
//       }, 1000);
//     };

//     getUrlAsync();
//   });

//   return {url, processing};
// };
