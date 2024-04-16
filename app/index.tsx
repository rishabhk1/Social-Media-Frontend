import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/state/store';
import { setUserId } from '@/state/reducers/loginSlice';

const SplashScreenComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [isDataPresent, setIsDataPresent] = useState(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const user_id= useSelector((state: RootState) => state.login.userId);

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
        const data = await AsyncStorage.getItem('userId');
        dispatch(setUserId(data))
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