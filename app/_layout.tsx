import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { Provider } from "react-redux";
import {store} from ".././state/store"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native'
import { useColorScheme } from '@/components/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const checkIfIdExists = async (id) => {
  try {
     const value = await AsyncStorage.getItem(id);
     if (value !== null) {
       // The ID exists in AsyncStorage
       console.log(`ID ${id} exists with value: ${value}`);
       return true;
     } else {
       // The ID does not exist in AsyncStorage
       console.log(`ID ${id} does not exist`);
       return false;
     }
  } catch (error) {
     // Error reading value
     console.error(error);
     return false;
  }
 };

 
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   // initialRouteName: '(tabs)',
//   initialRouteName: 'index',
// };

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded, error] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  //   ...FontAwesome.font,
  // });

  // // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error;
  // }, [error]);

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  const idToCheck = 'userToken';
  var route="index";
  // checkIfIdExists(idToCheck).then(exists => {
  //  if (exists) {
  //     route="(tabs)";
  //     console.log(`The ID ${idToCheck} exists in AsyncStorage.`);
  //  } else {
  //     console.log(`The ID ${idToCheck} does not exist in AsyncStorage.`);
  //  }
  // });
  
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login"  options={{ headerShown: false}}/>
        <Stack.Screen name="index"  options={{ headerShown: false}}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
          <Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
          <Stack.Screen name="comment/[id]" options={{ title: "Comment" }} />
          <Stack.Screen name="community/[id]" options={{ title: "Community" }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="addcomment/[parentId]" options={{ headerShown: false}}/>
        <Stack.Screen name="createCommunity" options={{ headerShown: false}}/>
      </Stack>
    </ThemeProvider>
  );
}
