import Post from '../../components/Post';
import tweets from '../../assets/data/tweets';
import comments from '../../assets/data/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
// import { user_id } from '@/constants/Urls';
import { clearPostComment } from "@/state/reducers/postCommentSlice";
import Comment from '@/components/Comment';
import {Text, View, FlatList, StyleSheet, TextInput, ScrollView, Pressable,ActivityIndicator} from 'react-native';
import {fetchPostComment, appealFromPCAction, upvoteFromPCAction, undoUpvoteFromPCAction, undoDownvoteFromPCAction, downvoteFromPCAction, fetchComment,deleteFromPCAction } from '@/actions/postComment'
import { Link, useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
import ErrorView from '@/components/ErrorView';

const initialPage = 0;

export default function PostScreen(){
    //const {postId} = useGlobalSearchParams();
    const {id} = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.postComment.posts);
    const loading = useSelector((state: RootState) => state.postComment.loading);
    const nextPage = useSelector((state: RootState) => state.postComment.nextPage);
    const error  = useSelector((state: RootState) => state.postComment.error);
    const user_id= useSelector((state: RootState) => state.login.userId);
    // const tweet = tweets.find((t => t.id === id));
    // const comment= tweet?.comments?.map((id) => {
    //     const cs = comments.find((c) => c.id === id);
    //     return cs;
    //   });

    // if(!tweet){
    //     return <Text>post {id} not found</Text>
    // }
    // console.log('ps',postId);
    console.log('local',id);

    const onRefresh = () => {
        dispatch(clearPostComment());
        //setNextPage(initialPage);
        if(loading) return;
        dispatch(fetchPostComment(user_id, id, initialPage));
        //setNextPage(nextPage+1);
      };
    
      useEffect(() => {
        dispatch(clearPostComment());
        if(loading) return;
        dispatch(fetchPostComment(user_id, id, initialPage));
        //setNextPage(nextPage+1);
      },[]);
      
      const retryAction = () => {
        // Implement your retry logic here
        // For example, you might clear the error and attempt to fetch data again
        onRefresh();
        
        // Fetch data or perform other actions here
     };
      if (error) {
        return (
          <ErrorView error={error} retryAction={retryAction} />
       );
      }
    return (
        <View style={styles.page}>
            {/* <ScrollView>
            <Post post={tweet} expand={true}/>
            <View style={{flex:1}}>
            {tweet?.comments?.length!=0 &&  <FlatList 
                data={comment} 
                renderItem={({item}) => <Comment comment={item}/>}
                style={{flex:1}}
            />}
            </View>
            </ScrollView> */}
            <FlatList
                data={posts} 
                // keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (item.hasOwnProperty('comments') ? ( //change user property parent
                    <Post 
                        post={item} 
                        expand={true}
                        upvoteFn={upvoteFromPCAction}
                        downvoteFn={downvoteFromPCAction}
                        undoDownvoteFn={undoDownvoteFromPCAction}
                        undoUpvoteFn={undoUpvoteFromPCAction}
                        deleteFn={deleteFromPCAction}
                        appealFn={appealFromPCAction}
                        />
                ) : (
                    <Comment 
                        comment={item}
                        upvoteFn={upvoteFromPCAction}
                        downvoteFn={downvoteFromPCAction}
                        undoDownvoteFn={undoDownvoteFromPCAction}
                        undoUpvoteFn={undoUpvoteFromPCAction}
                        deleteFn={deleteFromPCAction}
                        appealFn={appealFromPCAction}
                        />
                ))}
                contentContainerStyle={{paddingBottom:60}}
                onEndReached={() => {
                    if (!loading && nextPage>0) {
                    
                    dispatch(fetchComment(user_id,id,nextPage));
                    // setNextPage(nextPage+1);
                  }}}
                  //onEndReachedThreshold={2}
                  ListFooterComponent={() => loading && <ActivityIndicator />}
                  refreshing={loading}
                  onRefresh={onRefresh}
                
            />
            <Link href={`/addcomment/${id}`} asChild> 
                    
                    <Pressable style={styles.textInputContainer}>
                   
                    <TextInput
                    style={styles.textInput}
                    placeholder="Type here..."
                    editable={false}
                    
                    // Additional TextInput props as needed
                    />
                  
                    </Pressable>
                   
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: 'white',
    },
    textInputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', 
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
      textInput: {
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingHorizontal: 8,
        fontSize: 16,
      },
  });