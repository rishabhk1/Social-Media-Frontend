
import tweets from '../../assets/data/tweets';
import Comment from '@/components/Comment';
import comments from '../../assets/data/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect , useCallback} from 'react';
import { RootState, AppDispatch } from '@/state/store';
// import { user_id } from '@/constants/Urls';
import {Text, View, FlatList, StyleSheet, ActivityIndicator, Pressable, TextInput} from 'react-native';
import {appealFromCommentAction, fetchPostComment, upvoteFromCommentAction, undoUpvoteFromCommentAction, undoDownvoteFromCommentAction, downvoteFromCommentAction, fetchComment,deleteFromCommentAction } from '@/actions/comment'
import { useGlobalSearchParams, useLocalSearchParams, Link  } from 'expo-router';
import { clearComments } from '@/state/reducers/commentSlice';
import { useFocusEffect } from '@react-navigation/native';
import ErrorView from '@/components/ErrorView';

const initialPage=0;

export default function CommentScreen(){
    const {id} = useLocalSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.comment.posts);
    const loading = useSelector((state: RootState) => state.comment.loading);
    const nextPage = useSelector((state: RootState) => state.comment.nextPage);
    const error  = useSelector((state: RootState) => state.comment.error);
    const user_id= useSelector((state: RootState) => state.login.userId);
    // console.log(id);
    // const commentHead = comments.find((t => t.id === id));
    // const comment= commentHead?.comments?.map((id) => {
    //     const cs = comments.find((c) => c.id === id);
    //     return cs;
    //   });

    // if(!commentHead){
    //     return <Text>post {id} not found</Text>
    // }
    const onRefresh = () => {
        dispatch(clearComments());
        //setNextPage(initialPage);
        if(loading) return;
        dispatch(fetchPostComment(user_id, id, initialPage));
        //setNextPage(nextPage+1);
      };
    
      // useEffect(() => {
      //   dispatch(clearComments());
      //   if(loading) return;
      //   dispatch(fetchPostComment(user_id, id, initialPage));
      //   //setNextPage(nextPage+1);
      // },[]);

      // useEffect(() => {
      //   dispatch(clearComments());
      //   if(loading) return;
      //   dispatch(fetchPostComment(user_id, id, initialPage));
      //   //setNextPage(nextPage+1);
      // },[]);
      useFocusEffect(
        useCallback(() => {
        dispatch(clearComments());
        if(loading) return;
        dispatch(fetchPostComment(user_id, id, initialPage));
        //setNextPage(nextPage+1);
        }, [id])
      );
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
            {/* <Comment comment={commentHead}/>
            <View>
            {commentHead?.comments?.length!=0 && <FlatList 
                data={comment} 
                renderItem={({item}) => <Comment comment={item}/>}
            />} */}
                <FlatList
                data={posts} 
                // keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => ( //change user property parent
                    <Comment 
                        comment={item}
                        upvoteFn={upvoteFromCommentAction}
                        downvoteFn={downvoteFromCommentAction}
                        undoDownvoteFn={undoDownvoteFromCommentAction}
                        undoUpvoteFn={undoUpvoteFromCommentAction}
                        deleteFn={deleteFromCommentAction}
                        appealFn={appealFromCommentAction}
                        />)}
                onEndReached={() => {
                    if (!loading && nextPage>0) {
                    
                    dispatch(fetchComment(user_id,id,nextPage));
                    // setNextPage(nextPage+1);
                    }}}
                    //onEndReachedThreshold={2}
                    contentContainerStyle={{paddingBottom:60}}
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