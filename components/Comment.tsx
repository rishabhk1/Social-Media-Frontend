import { StyleSheet, Image, View, Text, Pressable, Alert, Share } from 'react-native';
import { Entypo    } from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import IconButton from './IconButton';
import React from 'react';
import {Link} from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
// import { user_id } from '@/constants/Urls';
import { AppDispatch, RootState } from '@/state/store';
import { showFromCommunityAction, hideFromCommunityAction } from '@/actions/community';
import { timeAgo } from './Post';
import MinidenticonImg from './IdentityIcon';

const createDeleteAlert = (dispatch, deleteFn, id, user_id) =>
Alert.alert('Delete', 'do you want to delete this comment', [
  {text: 'OK', onPress: () => dispatch(deleteFn(user_id, id))},
  {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
]);

const moderatorVoteAlert = (dispatch, id, user_id) =>
Alert.alert('Moderator Vote', 'select either show or hide for this post', [
  {text: 'Show', onPress: () => dispatch(showFromCommunityAction(user_id, id))},
  {
    text: 'Hide',
    onPress: () => dispatch(hideFromCommunityAction(user_id, id)),

  },
],{ cancelable: true});

// const appealAlert = (dispatch, appealFn, id, isAppealed) => {
//   if(isAppealed){
//     return Alert.alert('Appeal', 'this comment is already appealed')
//   }
//   return Alert.alert('appeal', 'do you want to appeal this comment', [
//     {text: 'OK', onPress: () => dispatch(appealFn(user_id, id))},
//     {
//       text: 'Cancel',
//       onPress: () => console.log('Cancel Pressed'),
//       style: 'cancel',
//     },
//   ],{ cancelable: true});
// }

const appealAlert = (dispatch, appealFn, id, isAppealed, showCount, user_id) => {
  if(showCount==-100){
    return Alert.alert('Appeal', 'this comment was already appealed and moderators decided to show the comment')
  }
  if(isAppealed){
    return Alert.alert('Appeal', 'this comment is already appealed')
  }
  return Alert.alert('appeal', 'do you want to appeal this comment', [
    {text: 'OK', onPress: () => dispatch(appealFn(user_id, id))},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ],{ cancelable: true});
}

const ShareComment = async (comment) => {
  // const onShare = async () => {
    try {
      const message = `🚀 Check out this comment by ${comment.authorName} 🚀\n\n📝 Content: ${comment.content}`;
      const result = await Share.share({
        message: message
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

const Comment = ({comment, upvoteFn, downvoteFn, undoDownvoteFn,undoUpvoteFn,deleteFn, appealFn, isModerator=false}) => {
  const dispatch = useDispatch<AppDispatch>();
  const user_id= useSelector((state: RootState) => state.login.userId);
    console.log(comment);
    return (
      <Link push href={`/comment/${comment.id}`} asChild>
        <Pressable style={styles.container}>
         <Link href={`/profile/${comment.author}`} asChild>
          <Pressable>
          {/* <Image 
            src={'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png'} 
            style={styles.userImage}
          /> */}
            <MinidenticonImg username={comment.author} saturation={50} lightness={50} height={50} width={50}/>
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
            <Text style={styles.username}>{timeAgo(comment.createdAt)}</Text>
            {(isModerator && !(comment.hasHidevoted ||  comment.hasShowvoted)) && <Entypo name="dots-three-horizontal" size={16} color="black" style={{marginLeft: 'auto'}} onPress={()=>moderatorVoteAlert(dispatch, comment.id, user_id)}/>}
          </View>
          <Text style={styles.content}>{comment.content}</Text>
          <View style={styles.footer}>
              {/* <IconButton icon='arrow-up' text={post.score}/>
              <IconButton icon='comment-outline' text={post.comments?.length}/>
              <IconButton icon='share-outline' text=''/> */}
            <View style={{    flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  
                name={'arrow-up'} 
                size={26} 
                color={comment.hasUpvoted?"black":"gray"} 
                onPress={() => {
                  comment.hasUpvoted?dispatch(undoUpvoteFn(user_id,comment.id)):dispatch(upvoteFn(user_id, comment.id))
                }}
                />
              <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: "black" }}>{comment.score}</Text>
              </View>
              <MaterialCommunityIcons  
                name={'arrow-down'} 
                size={26} 
                color={comment.hasDownvoted?"black":"gray"}
                onPress={() => {
                  comment.hasDownvoted?dispatch(undoDownvoteFn(user_id,comment.id)):dispatch(downvoteFn(user_id, comment.id))
                }}
                />
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'comment-outline'} size={26} color="gray"/>
              <Text style={{marginHorizontal:3,fontSize:12, color:"black"}}>{comment.replies?.length}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'share-outline'} size={26} color="gray" onPress={() => ShareComment(comment)}/>
            </View>
            </View>
            <View style={{    flexDirection: 'row', alignItems: 'center'}}>
              {((comment.author === user_id) && <View style={{marginRight:10}}>
                <MaterialCommunityIcons  name={'delete-outline'} size={26} color="gray" onPress={() => createDeleteAlert(dispatch, deleteFn, comment.id, user_id)}/>
              </View>)}
              <View>
                <MaterialCommunityIcons  name={'flag-variant-outline'} size={26} color="gray" onPress={() => appealAlert(dispatch, appealFn, comment.id, comment.isAppealed, comment.showCount, user_id)}/>
              </View>
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
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });
 
export default Comment;  