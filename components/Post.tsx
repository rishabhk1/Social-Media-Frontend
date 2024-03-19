import { StyleSheet, Image, View, Text, Pressable, Alert } from 'react-native';
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
          <Image 
            src={'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.png'} 
            style={styles.userImage}
          />
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
            <Text style={styles.username}>2h</Text>
            {isModerator && <Entypo name="dots-three-horizontal" size={16} color="black" style={{marginLeft: 'auto'}}  onPress={()=>moderatorVoteAlert(dispatch, post.id)}/>}
          </View>
          <Text style={styles.content}>{post.title}</Text>
          {expand && <Text style={styles.content}>{post.content}</Text>}
          <View style={styles.footer}>
              {/* <IconButton icon='arrow-up' text={post.score}/>
              <IconButton icon='comment-outline' text={post.comments?.length}/>
              <IconButton icon='share-outline' text=''/> */}
            <View style={{    flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  
                name={'arrow-up'} 
                size={22} 
                color={post.hasUpvoted?"black":"gray"} 
                onPress={() => {
                  post.hasUpvoted?dispatch(undoUpvoteFn(user_id,post.id)):dispatch(upvoteFn(user_id, post.id))
                }}
                />
              <Text style={{marginHorizontal:3,fontSize:12, color:"black"}}>{post.score}</Text>
              <MaterialCommunityIcons  
                name={'arrow-down'} 
                size={22} 
                color={post.hasDownvoted?"black":"gray"}
                onPress={() => {
                  post.hasDownvoted?dispatch(undoDownvoteFn(user_id,post.id)):dispatch(downvoteFn(user_id, post.id))
                }}
                />
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'comment-outline'} size={22} color="gray"/>
              <Text style={{marginHorizontal:3,fontSize:12, color:"gray"}}>{post.comments?.length}</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
              <MaterialCommunityIcons  name={'share-outline'} size={22} color="gray"/>
            </View>
            </View>
            <View style={{    flexDirection: 'row', alignItems: 'center'}}>
              {((post.author === user_id) && <View style={{marginRight:10}}>
                <MaterialCommunityIcons  name={'delete-outline'} size={22} color="gray" onPress={() => createDeleteAlert(dispatch, deleteFn, post.id)}/>
              </View>)}
              <View>
                <MaterialCommunityIcons  name={'flag-variant-outline'} size={22} color="gray" onPress={() => appealAlert(dispatch, appealFn, post.id, post.isAppealed, post.showCount)}/>
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