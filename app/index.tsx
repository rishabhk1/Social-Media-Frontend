import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';

const SplashScreenComponent = () => {
  const navigation = useNavigation();
  const [isDataPresent, setIsDataPresent] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Prevent the splash screen from auto-hiding before the app is ready
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    const checkAsyncStorage = async () => {
      try {
        // Check if data exists in AsyncStorage
        const data = await AsyncStorage.getItem('userId');
        console.log('data', data);
        setIsDataPresent(!!data);
      } catch (error) {
        console.error('Error checking AsyncStorage:', error);
        setIsDataPresent(false);
      } finally {
        // Hide the splash screen after checking AsyncStorage
        setAppIsReady(true);
      }
    };

    checkAsyncStorage();
  }, []);

  useEffect(() => {
    const redirectToScreen = async () => {
      if (isDataPresent !== null) {
        const screenName = isDataPresent ? '(tabs)' : 'login';
        console.log(screenName);
        navigation.reset({
            index: 0,
            routes: [{ name: screenName }],
          });
          const delay = new Promise((resolve) => setTimeout(resolve, 1000));
          await delay;
          await SplashScreen.hideAsync();
      }
    };

    if (appIsReady) {
    //   const timeout = setTimeout(redirectToScreen, 20); // Adjust the delay as needed
    //   return () => clearTimeout(timeout);
        redirectToScreen();
    }
  }, [isDataPresent, appIsReady, navigation]);

//   useEffect(() => {
//     const hideAppSplashScreen = async () => {
//       if (appIsReady) {
//         await SplashScreen.hideAsync();
//       }
//     };

//     hideAppSplashScreen();
//   }, [appIsReady]);

  return null; // Don't render any view component for the splash screen
};

export default function App() {
    return <SplashScreenComponent />;
  }