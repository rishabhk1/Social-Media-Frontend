import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { KeyboardAvoidingView, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Platform , Dimensions} from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearLogin, setAuth } from '@/state/reducers/loginSlice';
import { RootState, AppDispatch } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get("window")

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();

  const handlePress = (routeName:string) => {
    closeMenu(); // Close the menu after navigation (optional)
    navigation.navigate(routeName);
  };

  const resetAndNavigate = (routeName:string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName }],
    });
 };

 const clearAllData = async () => {
  try {
    console.log('clearing');
     await AsyncStorage.clear();
  } catch (error) {
     // Error clearing data
     console.error(error);
  }
 };

  
  return (
    <PaperProvider>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      > */}
                        {/* <View style={{
            width,
            height,
        }}> */}
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: "Home",
          tabBarIcon: ({ color}) => (
            <Entypo
              name="home"
              size={28}
              color={color}
            />
          ),
          headerRight: () => (
            // <Link href="/modal" asChild>
            //   <Pressable>
            //     {({ pressed }) => (
            //       <FontAwesome
            //         name="info-circle"
            //         size={25}
            //         color={Colors[colorScheme ?? 'light'].text}
            //         style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            //       />
            //     )}
            //   </Pressable>
            // </Link>
            
            <View
              style={{
                // paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchorPosition='bottom'
                anchor={<Button icon="menu" onPress={openMenu} theme={{ colors: { primary: Colors[colorScheme ?? 'light'].tint } }}></Button>}
                // theme={{ colors: { elevation:{level1: Colors[colorScheme ?? 'light']}} }}
                >
                {/* <Link href="/createCommunity" asChild> */}
                <Menu.Item
                  title="Create Community"
                  leadingIcon="plus-circle"
                  onPress={() => handlePress("createCommunity")}
                  theme={{ colors: { onSurfaceVariant: Colors[colorScheme ?? 'light'].tint, onSurface: Colors[colorScheme ?? 'light'].tint } }}
                />
                {/* </Link> */}
                <Divider />
                <Menu.Item
                  onPress={() => {clearAllData();dispatch(clearLogin());resetAndNavigate("login");}}
                  title="Logout"
                  leadingIcon="logout"
                  theme={{ colors: { onSurfaceVariant: Colors[colorScheme ?? 'light'].tint, onSurface: Colors[colorScheme ?? 'light'].tint } }}
                />
              </Menu>
            </View>
          
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown: false,
          title: 'Create',
          tabBarIcon: ({ color }) => <Entypo name="plus" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search Community',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Entypo name="user" size={28} color={color} />,
        }}
      />
    </Tabs>
    {/* </View> */}
    {/* </KeyboardAvoidingView> */}
    </PaperProvider>
  );
}
