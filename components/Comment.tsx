import { StyleSheet, Image, View, Text, Pressable } from 'react-native';
import { Entypo    } from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import IconButton from './IconButton';
import React from 'react';
import {Link} from 'expo-router';
import { useDispatch } from 'react-redux';
import { user_id } from '@/constants/Urls';
import { AppDispatch } from '@/state/store';

const Comment = ({comment, upvoteFn, downvoteFn, undoDownvoteFn,undoUpvoteFn}) => {
  const dispatch = useDispatch<AppDispatch>();
    console.log(comment);
    return (
      <Link href={`/comment/${comment.id}`} asChild>
        <Pressable style={styles.container}>
         <Link href={`/profile/${comment.author}`} asChild>
          <Pressable>
          <Image 
            src={'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png'} 
            style={styles.userImage}
          />
          </Pressable>
        </Link>
        <View style={styles.mainContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>{comment.authorName}</Text>
            <Pressable style={styles.username}>
              <Link href={`/community/${comment.community}`}>
              <Text style={styles.username}>{comment.communityName}</Text>
              </Link>
            </Pressable>
            <Text style={styles.username}>2h</Text>
            <Entypo name="dots-three-horizontal" size={16} color="gray" style={{marginLeft: 'auto'}}/>
          </View>
          <Text style={styles.content}>{comment.content}</Text>
          <View style={styles.footer}>
              {/* <IconButton icon='arrow-up' text={post.score}/>
              <IconButton icon='comment-outline' text={post.comments?.length}/>
              <IconButton icon='share-outline' text=''/> */}
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  
                name={'arrow-up'} 
                size={22} 
                color={comment.hasUpvoted?"black":"gray"} 
                onPress={() => {
                  comment.hasUpvoted?dispatch(undoUpvoteFn(user_id,comment.id)):dispatch(upvoteFn(user_id, comment.id))
                }}
                />
              <Text style={{marginHorizontal:3,fontSize:12, color:"black"}}>{comment.score}</Text>
              <MaterialCommunityIcons  
                name={'arrow-down'} 
                size={22} 
                color={comment.hasDownvoted?"black":"gray"}
                onPress={() => {
                  comment.hasDownvoted?dispatch(undoDownvoteFn(user_id,comment.id)):dispatch(downvoteFn(user_id, comment.id))
                }}
                />
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'comment-outline'} size={22} color="gray"/>
              <Text style={{marginHorizontal:3,fontSize:12, color:"gray"}}>{comment.replies?.length}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'share-outline'} size={22} color="gray"/>
            </View>
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