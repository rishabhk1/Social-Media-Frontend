import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();

  const handlePress = (routeName:string) => {
    closeMenu(); // Close the menu after navigation (optional)
    navigation.navigate(routeName);
  };
  
  return (
    <PaperProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Entypo name="home" size={28} color="white" />,
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
                anchor={<Button icon="menu" onPress={openMenu} theme={{ colors: { primary: 'white' } }}></Button>}
                // theme={{ colors: { elevation:{level2: 'black'}} }}
                >
                {/* <Link href="/createCommunity" asChild> */}
                <Menu.Item
                  title="Create Community"
                  leadingIcon="plus-circle"
                  onPress={() => handlePress('createCommunity')}
                  theme={{ colors: { onSurfaceVariant: 'white', onSurface: 'white' } }}
                />
                {/* </Link> */}
                <Menu.Item
                  // onPress={() => {}}
                  title="Settings"
                  leadingIcon={({ color, size }) => (
                    <Ionicons name="settings" color={color} size={size} />
                  )}
                  theme={{ colors: { onSurfaceVariant: 'white', onSurface: 'white' } }}
                />
                <Divider />
                <Menu.Item
                  // onPress={() => {}}
                  title="Logout"
                  leadingIcon="logout"
                  theme={{ colors: { onSurfaceVariant: 'white', onSurface: 'white' } }}
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
          tabBarIcon: ({ color }) => <Entypo name="plus" size={28} color="white" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Entypo name="user" size={28} color="white" />,
        }}
      />
    </Tabs>
    </PaperProvider>
  );
}
