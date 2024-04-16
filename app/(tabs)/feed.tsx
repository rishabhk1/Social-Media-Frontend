import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect , useCallback} from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { Text, View } from '@/components/Themed';
import tweets from '@/assets/data/tweets';
import Post from '@/components/Post';
import { fetchPosts, upvoteFromFeedAction, downvoteFromFeedAction, undoUpvoteFromFeedAction, undoDownvoteFromFeedAction, deleteFromFeedAction, appealFromFeedAction } from '@/actions/feed';
// import { user_id } from '@/constants/Urls';
import { clearFeed } from "@/state/reducers/feedSlice";
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import ErrorView from '@/components/ErrorView';

const initialPage = 0;

export default function TabOneScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.feed.posts);
  const loading = useSelector((state: RootState) => state.feed.loading);
  const nextPage = useSelector((state: RootState) => state.feed.nextPage);
  const error  = useSelector((state: RootState) => state.feed.error);
  const user_id= useSelector((state: RootState) => state.login.userId);
  // const [nextPage, setNextPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  
  const onRefresh = () => {
    dispatch(clearFeed());
    //setNextPage(initialPage);
    if(loading) return;
    dispatch(fetchPosts(user_id,initialPage));
    //setNextPage(nextPage+1);
  };

  useEffect(() => {
    dispatch(clearFeed());
    if(loading) return;
    dispatch(fetchPosts(user_id, initialPage));
    //setNextPage(nextPage+1);
  },[]);

  const retryAction = () => {
    onRefresh();
  };
  if (error) {
    return (
      <ErrorView error={error} retryAction={retryAction} />
   );
  }
  console.log(loading)
  return (

    <View style={styles.page}>
      {/* <PaperProvider>
      <View
        style={{
          // paddingTop: 50,
          // flexDirection: 'row',
          // justifyContent: 'center',
          // zIndex: 100
        }}>
        <Menu
          visible={visible}
          onDismiss={()=>closeMenu()}
          theme={{ colors: { primary: 'green' } }}
          anchor={<Button onPress={()=>openMenu()}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </PaperProvider> */}
      {posts.length === 0 && !loading &&  (
        <Text style={styles.emptyStateText}>Join communities to see posts.</Text>
      )}
      <FlatList 
        data={posts} 
        renderItem={({item}) => <Post post={item} 
                                  expand={false} 
                                  upvoteFn={upvoteFromFeedAction}
                                  downvoteFn={downvoteFromFeedAction}
                                  undoDownvoteFn={undoDownvoteFromFeedAction}
                                  undoUpvoteFn={undoUpvoteFromFeedAction}
                                  deleteFn={deleteFromFeedAction}
                                  appealFn={appealFromFeedAction}
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
  },
  emptyStateText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black'
 }
});
