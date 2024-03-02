import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import { Entypo    } from '@expo/vector-icons';
import IconButton from './IconButton';
import React from 'react';
import {Link} from 'expo-router';

const Comment = ({comment}) => {
    console.log(comment);
    return (
      <Link href={`/comment/${comment.id}`} asChild>
        <Pressable style={styles.container}>
        <Image 
          src={comment.image} 
          style={styles.userImage}
        />
        <View style={styles.mainContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>{comment.name}</Text>
            <Pressable style={styles.username}>
              <Link href={'/community/1'}>
              <Text style={styles.username}>{comment.username}</Text>
              </Link>
            </Pressable>
            <Text style={styles.username}>2h</Text>
            <Entypo name="dots-three-horizontal" size={16} color="gray" style={{marginLeft: 'auto'}}/>
          </View>
          <Text style={styles.content}>{comment.content}</Text>
          <View style={styles.footer}>
              <IconButton icon='arrow-up' text='12'/>
              <IconButton icon='comment-outline' text='12'/>
              <IconButton icon='share-outline' text=''/>
          </View>
        </View>
      </Pressable>
      </Link>
    );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      borderColor: 'lightgrey',
      borderBottomWidth: StyleSheet.hairlineWidth,
      backgroundColor: 'white',
    },
    userImage: {
      width: 50,
      height: 50,
       borderRadius: 50,
    },
    mainContainer: {
      marginLeft: 10,
      flex:1,
    },
    name:{
      fontWeight: '600',
    },
    username:{
      color: 'gray',
      marginLeft: 5,
    },
    content:{
      lineHeight: 20,
      marginTop: 5,
    },
    footer:{
      flexDirection: 'row',
      marginVertical: 5,
    }
  });
 
export default Comment;  