// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View, Button } from "react-native";
// // import {
// //   GoogleSignin,
// //   GoogleSigninButton,
// //   statusCodes,
// // } from "@react-native-google-signin/google-signin";
// import { useEffect, useState } from "react";
// import { Link } from "expo-router";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // npx expo install @react-native-google-signin/google-signin
// // npx expo install expo-dev-client

// const storeData = async (key, value) => {
//   try {
//      await AsyncStorage.setItem(key, value);
//   } catch (error) {
//      // Error saving data
//      console.error(error);
//   }
//  };

// export default function App() {
//   const [error, setError] = useState();
//   const [userInfo, setUserInfo] = useState();

// //   const configureGoogleSignIn = () => {
// //     GoogleSignin.configure({
// //         webClientId:"758151940704-p1t47tqfe7k131pv4pnm3dicj5fkcg6k.apps.googleusercontent.com",
// //         androidClientId:"758151940704-gps5h8368rklf3olm22g19716uga7bn9.apps.googleusercontent.com",
// //     });
// //   };

// //   useEffect(() => {
// //     configureGoogleSignIn();
// //   });

// //   const signIn = async () => {
// //     console.log("Pressed sign in");

// //     try {
// //       await GoogleSignin.hasPlayServices();
// //       const userInfo = await GoogleSignin.signIn();
// //       setUserInfo(userInfo);
// //       setError();
// //     } catch (e) {
// //       setError(e);
// //     }
// //   };

// //   const logout = () => {
// //     setUserInfo(undefined);
// //     GoogleSignin.revokeAccess();
// //     GoogleSignin.signOut();
// //   };

//   return (
//     <View style={styles.container}>
//       {/* <Text>{JSON.stringify(error)}</Text>
//       {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
//       {userInfo ? (
//         <Button title="Logout" onPress={logout} />
//       ) : (
//         <GoogleSigninButton
//           size={GoogleSigninButton.Size.Standard}
//           color={GoogleSigninButton.Color.Dark}
//           onPress={signIn}
//         />
//       )}
//       <StatusBar style="auto" /> */}
//       <Text>hello</Text>
//       <Link replace href='/(tabs)/feed' asChild>
//         <Button title='Login' onPress={ () => storeData("userId", "1")}/>
//       </Link>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet,ActivityIndicator, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';
import ErrorView from '@/components/ErrorView';
import { clearLogin } from '@/state/reducers/loginSlice';
import { loginAction } from '@/actions/login';
import { useNavigation } from '@react-navigation/native';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import img from '../assets/images/t.png';

const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.login.error);
  const loading = useSelector((state: RootState) => state.login.loading);
  const auth=useSelector((state: RootState) => state.login.auth);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const handleLogin = () => {
  if(username.trim() === ''){
    Alert.alert('Error!', 'Please enter username');
    return;
  }
  if(password.trim() === ''){
    Alert.alert('Error!', 'Please enter password');
    return;
  }
    dispatch(loginAction(username, password));
 };
 useEffect(() => {
  if (auth) {
    navigation.reset({
      index: 0,
      routes: [{ name: '(tabs)' }],
    });
  }
}, [auth]);
 const retryAction = () => {
  // Implement your retry logic here
  // For example, you might clear the error and attempt to fetch data again

  dispatch(clearLogin());

  
  // Fetch data or perform other actions here
};
 if (error) {
  return (
    <ErrorView error={error} retryAction={retryAction} />
 );
}

 return (
    <View style={styles.container}>
      <View>
      <Image source={img} style={{ width: 300, height: 300 }} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        selectionColor="black"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        selectionColor="black"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={handleLogin} color="black" />
      </View>
      {(loading && <ActivityIndicator/>)}
    </View>
 );
};

const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: 'white',
    //  justifyContent: 'center', // Center children vertically
     alignItems: 'center', // Center children horizontally
     paddingHorizontal: 20,
  },
  input: {
     height: 40,
     borderColor: 'gray',
     borderWidth: 1,
     marginBottom: 10,
     paddingLeft: 10,
     width: '100%', // Ensure the input fields take up the full width
  },
  buttonContainer: {
     borderRadius: 50,
     overflow: 'hidden', // This is important to make the borderRadius effective
     marginTop: 10,
     width: 80,
     alignItems: 'center', // Center the button horizontally
     justifyContent: 'center', // Center the button vertically
  },
 });

export default LoginPage;
