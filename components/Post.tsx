import { StyleSheet, Image, View, Text, Pressable, Alert, Share } from 'react-native';
import { Entypo    } from '@expo/vector-icons';
import IconButton from './IconButton';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { user_id } from '@/constants/Urls';
import { AppDispatch } from '@/state/store';
import { Button, Dialog, Portal,PaperProvider } from 'react-native-paper';
import { showFromCommunityAction, hideFromCommunityAction } from '@/actions/community';
import {Link} from 'expo-router';
import MinidenticonImg from './IdentityIcon';

export function timeAgo(dateString: string): string {
  const now = new Date();
  console.log(now);
  const date = new Date(dateString);
  const diffInSeconds = Math.floor(Math.abs(now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) { // less than a minute
      return `${diffInSeconds}s`;
  } else if (diffInSeconds < 3600) { // less than an hour
      return `${Math.floor(diffInSeconds / 60)}m`;
  } else if (diffInSeconds < 86400) { // less than a day
      return `${Math.floor(diffInSeconds / 3600)}h`;
  } else if (diffInSeconds < 31536000) { // less than a month
      return `${Math.floor(diffInSeconds / 86400)}d`;
  } else {
      return `${Math.floor(diffInSeconds / 31536000)}y`;
  }
}

const createDeleteAlert = (dispatch, deleteFn, id) =>
Alert.alert('Delete', 'do you want to delete this post', [
  {text: 'OK', onPress: () => dispatch(deleteFn(user_id, id))},
  {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
],{ cancelable: true});

const moderatorVoteAlert = (dispatch, id) =>
Alert.alert('Moderator Vote', 'select either show or hide for this post', [
  {text: 'Show', onPress: () => dispatch(showFromCommunityAction(user_id, id))},
  {
    text: 'Hide',
    onPress: () => dispatch(hideFromCommunityAction(user_id, id)),

  },
],{ cancelable: true});

const appealAlert = (dispatch, appealFn, id, isAppealed, showCount) => {
  if(showCount==-100){
    return Alert.alert('Appeal', 'this post was already appealed and moderators decided to show the post')
  }
  if(isAppealed){
    return Alert.alert('Appeal', 'this post is already appealed')
  }
  return Alert.alert('appeal', 'do you want to appeal this post', [
    {text: 'OK', onPress: () => dispatch(appealFn(user_id, id))},
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
  ],{ cancelable: true});
}

const SharePost = async (post) => {
  // const onShare = async () => {
    try {
      // const message = `user - ${post.authorName}\ncommunity - ${post.communityName}\n${post.title}\n${post.content}`;
      const message=`🚀 Check out this post by ${post.authorName} in the ${post.communityName} community! 🚀\n\n📌 Title: ${post.title}\n\n📝 Content: ${post.content}`;
      const result = await Share.share({
        message: message,
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

const Post = ({post,expand, upvoteFn, downvoteFn, undoDownvoteFn,undoUpvoteFn, deleteFn, appealFn, isModerator=false}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);
  const showDialog= () => setVisible(true);

  const dispatch = useDispatch<AppDispatch>();
  //console.log(post.id);
    return (
      <Link href={`/post/${post.id}`} asChild>
        <Pressable style={styles.container}>
         <Link href={`/profile/${post.author}`} asChild>
          <Pressable>
          {/* <Image 
            src={'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png'} 
            style={styles.userImage}
          /> */}
          <MinidenticonImg username={post.author} saturation={50} lightness={50} height={50} width={50}/>
          {/* <Image style={styles.userImage} source={{ uri:  'data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%22-1.5%20-1.5%208%208%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22hsl(120%2050%25%2050%25)%22%3E%3Crect%20x%3D%220%22%20y%3D%222%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%221%22%20y%3D%220%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%221%22%20y%3D%223%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%221%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%223%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%222%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%220%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%223%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3C%2Fsvg%3E' }}    /> */}
          </Pressable>
        </Link>
        <View style={styles.mainContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>{post.authorName}</Text>
            <Pressable style={styles.username}>
              <Link href={`/community/${post.community}`}>
              <Text style={styles.username}>{post.communityName}</Text>
              </Link>
            </Pressable>
            <Text style={styles.username}>{timeAgo(post.createdAt)}</Text>
            {isModerator && <Entypo name="dots-three-horizontal" size={16} color="black" style={{marginLeft: 'auto'}}  onPress={()=>moderatorVoteAlert(dispatch, post.id)}/>}
          </View>
          {expand && <Text style={styles.title}>{post.title}</Text>}
          {!expand && <Text style={styles.content}>{post.title}</Text>}
          {expand && <Text style={styles.content}>{post.content}</Text>}
          <View style={styles.footer}>
              {/* <IconButton icon='arrow-up' text={post.score}/>
              <IconButton icon='comment-outline' text={post.comments?.length}/>
              <IconButton icon='share-outline' text=''/> */}
            <View style={{    flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  
                name={'arrow-up'} 
                size={26} 
                color={post.hasUpvoted?"black":"gray"} 
                onPress={() => {
                  post.hasUpvoted?dispatch(undoUpvoteFn(user_id,post.id)):dispatch(upvoteFn(user_id, post.id))
                }}
                />
              <View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: "black" }}>{post.score}</Text>
              </View>
              <MaterialCommunityIcons  
                name={'arrow-down'} 
                size={26} 
                color={post.hasDownvoted?"black":"gray"}
                onPress={() => {
                  post.hasDownvoted?dispatch(undoDownvoteFn(user_id,post.id)):dispatch(downvoteFn(user_id, post.id))
                }}
                />
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'comment-outline'} size={26} color="gray"/>
              <Text style={{marginHorizontal:3,fontSize:12, color:"black", alignItems:'center'}}>{post.comments?.length}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'share-outline'} size={26} color="gray" onPress={() => SharePost(post)}/>
            </View>
            </View>
            <View style={{    flexDirection: 'row', alignItems: 'center'}}>
              {((post.author === user_id) && <View style={{marginRight:10}}>
                <MaterialCommunityIcons  name={'delete-outline'} size={26} color="gray" onPress={() => createDeleteAlert(dispatch, deleteFn, post.id)}/>
              </View>)}
              <View>
                <MaterialCommunityIcons  name={'flag-variant-outline'} size={26} color="gray" onPress={() => appealAlert(dispatch, appealFn, post.id, post.isAppealed, post.showCount)}/>
              </View>
            </View>
          </View>
           <View style={styles.mainButtoncontainer}>
           {(showButtons && <View style={styles.buttonContainer}>
                <Button
                  buttonColor="#FFFF00"
                  style={styles.button}
                  mode='contained'
                >appeal</Button>
                <Button
                  buttonColor="#FF0000"
                  style={styles.button}
                  mode='contained'
                  disabled={post.author !== user_id}>delete</Button>
              </View>)}
            
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
    title:{
      lineHeight: 20,
      marginTop: 5,
      fontWeight: 'bold'
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
    },
    mainButtoncontainer: {
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    button: {
      // marginHorizontal: 10,
      alignItems: 'center',
      marginRight:40

    },
  });
 
export default Post;  