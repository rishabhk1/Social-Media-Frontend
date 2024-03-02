import { StyleSheet, FlatList } from 'react-native';
import {useGlobalSearchParams, useNavigation,useLocalSearchParams} from 'expo-router';
import { Text, View } from '@/components/Themed';
import tweets from '@/assets/data/tweets';
import UserList from '@/components/UserList';
import React, {useEffect} from 'react';

export default function Modal() {
  const {type} = useLocalSearchParams();
  console.log(type);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: type });
  }, [navigation])

  return (
    <View style={styles.page}>
      <FlatList 
        data={tweets} 
        renderItem={({item}) => <UserList id={item.id} image={item.user.image} text={item.user.name}/>}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  }
});