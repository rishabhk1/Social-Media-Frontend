import { StyleSheet, FlatList } from 'react-native';
import {useGlobalSearchParams, useNavigation,useLocalSearchParams} from 'expo-router';
import { Text, View } from '@/components/Themed';
// import tweets from '@/assets/data/tweets';
import UserList from '@/components/UserList';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';

export default function Modal() {
  const dispatch = useDispatch<AppDispatch>();
  const moderators = useSelector((state: RootState) => state.community.moderators);
  const members = useSelector((state: RootState) => state.community.members);
  const {type} = useLocalSearchParams();
  console.log(type);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: type });
  }, [navigation])

  return (
    <View style={styles.page}>
      <FlatList 
        data={type=="moderators"?moderators:members} 
        renderItem={({item}) => <UserList id={item.id} image={'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png'} text={item.username}/>}
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