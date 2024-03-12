import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { Text, View } from '@/components/Themed';
import tweets from '@/assets/data/tweets';
import Post from '@/components/Post';
import { fetchPosts, upvoteFromFeedAction, downvoteFromFeedAction, undoUpvoteFromFeedAction, undoDownvoteFromFeedAction } from '@/actions/feed';
import { user_id } from '@/constants/Urls';
import { clearFeed } from "@/state/reducers/feedSlice";

const initialPage = 0;

export default function TabOneScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.feed.posts);
  const loading = useSelector((state: RootState) => state.feed.loading);
  const nextPage = useSelector((state: RootState) => state.feed.nextPage);
  const error  = useSelector((state: RootState) => state.feed.error);
  // const [nextPage, setNextPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = () => {
    dispatch(clearFeed());
    //setNextPage(initialPage);
    if(loading) return;
    dispatch(fetchPosts(user_id,initialPage));
    //setNextPage(nextPage+1);
  };

  useEffect(() => {
    if(loading) return;
    dispatch(fetchPosts(user_id,initialPage));
    //setNextPage(nextPage+1);
  },[]);

  return (
    <View style={styles.page}>
      <FlatList 
        data={posts} 
        renderItem={({item}) => <Post post={item} 
                                  expand={false} 
                                  upvoteFn={upvoteFromFeedAction}
                                  downvoteFn={downvoteFromFeedAction}
                                  undoDownvoteFn={undoDownvoteFromFeedAction}
                                  undoUpvoteFn={undoUpvoteFromFeedAction}
                                  />}
        onEndReached={() => {
          if (!loading && nextPage>0) {
          
          dispatch(fetchPosts(user_id,nextPage));
          // setNextPage(nextPage+1);
        }}}
        //onEndReachedThreshold={2}
        ListFooterComponent={() => loading && <ActivityIndicator />}
        refreshing={loading}
        onRefresh={onRefresh}
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
