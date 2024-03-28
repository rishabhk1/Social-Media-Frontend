import { StyleSheet, FlatList,SectionList, View, Image, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import tweets from '@/assets/data/tweets';
// import comments from '@/assets/data/comments';
import Post from '@/components/Post';
import Comment from '@/components/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect , useCallback} from 'react';
import { RootState, AppDispatch } from '@/state/store';
import {fetchPost, fetchComment, fetchPostComment, upvoteFromProfileAction, downvoteFromProfileAction, undoDownvoteFromProfileAction, undoUpvoteFromProfileAction, deleteFromProfileAction, appealFromProfileAction} from '@/actions/profile'
import { clearProfile } from '@/state/reducers/profileSlice';
import { user_id } from '@/constants/Urls';
import MinidenticonImg from '@/components/IdentityIcon';
import ErrorView from '@/components/ErrorView';
import { useFocusEffect } from '@react-navigation/native';

const initialPagePost = 0;
const intialPageComment=0;


export default function Profile({id=user_id}) {
    console.log("profile", id);
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.profile.posts);
    const comments = useSelector((state: RootState) => state.profile.comments);
    const loading = useSelector((state: RootState) => state.profile.loading);
    const nextPagePost = useSelector((state: RootState) => state.profile.nextPagePost);
    const nextPageComment = useSelector((state: RootState) => state.profile.nextPageComment);
    const targetUserId = useSelector((state: RootState) => state.profile.targetUserId);
    const targetUserReputation = useSelector((state: RootState) => state.profile.targetUserReputation);
    const targetUserEmail = useSelector((state: RootState) => state.profile.targetUserEmail);
    const targetUserName = useSelector((state: RootState) => state.profile.targetUserName);
    const error  = useSelector((state: RootState) => state.profile.error);
    const [selectedSection, setSelectedSection] = useState('posts');
    const sections = [
        {
            id: '1',
            title: 'posts',
            data: posts
        },
        {
            id: '2',
            title: 'comments',
            data: comments
        }
    ];
    const img = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png';
    const onRefresh = () => {
        dispatch(clearProfile());
        //setNextPage(initialPage);
        if(loading) return;
        dispatch(fetchPostComment(id, user_id, initialPagePost, intialPageComment));
        //setNextPage(nextPage+1);
      };
    
    //   useEffect(() => {
    //     dispatch(clearProfile());
    //     if(loading) return;
    //     dispatch(fetchPostComment(id, user_id, initialPagePost, intialPageComment));
    //     //setNextPage(nextPage+1);
    //   },[]);

      useFocusEffect(
        useCallback(() => {
            dispatch(clearProfile());
            if(loading) return;
            dispatch(fetchPostComment(id, user_id, initialPagePost, intialPageComment));
        //setNextPage(nextPage+1);
        }, [id])
      );
    const renderItem = ({item, section}) =>{
        if(selectedSection==='comments' && section.title==='comments'){
            return <Comment 
                    comment={item}
                    upvoteFn={upvoteFromProfileAction}
                    downvoteFn={downvoteFromProfileAction}
                    undoUpvoteFn={undoUpvoteFromProfileAction}
                    undoDownvoteFn={undoDownvoteFromProfileAction}
                    deleteFn={deleteFromProfileAction}
                    appealFn={appealFromProfileAction}
                    />;
        }
        else if(selectedSection==='posts' && section.title==='posts'){
            return <Post 
                    post={item} 
                    expand={false}
                    upvoteFn={upvoteFromProfileAction}
                    downvoteFn={downvoteFromProfileAction}
                    undoUpvoteFn={undoUpvoteFromProfileAction}
                    undoDownvoteFn={undoDownvoteFromProfileAction}
                    deleteFn={deleteFromProfileAction}
                    appealFn={appealFromProfileAction}
                    />;
        }
    };
    // const renderSectionHeader = ({section}) => (
    //     <TouchableOpacity  key={section.id} onPress={() => setSelectedSection(section.title)}>
    //         <View style={{backgroundColor: selectedSection === section.title?'lightgray':'white'}}>
    //             <Text style={{padding: 10, fontWeight: selectedSection === section.title? 'bold': 'normal'}}>{section.title}</Text>
    //         </View>  
    //     </TouchableOpacity>
    // );
    const retryAction = () => {
        onRefresh();
      };
      if (error) {
        return (
          <ErrorView error={error} retryAction={retryAction} />
       );
      }
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <View style={{margin:20}}>
                    <MinidenticonImg username={id} saturation={50} lightness={50} height={100} width={100}/>
                </View>
                <View style={styles.userInfo}>
                    <Text style={styles.userText}>{targetUserName}</Text>
                    <Text style={styles.userText}>reputation {targetUserReputation}</Text>
                </View>
            </View>
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: 'black'}}>
                    {
                        sections.map((section) => (
                            <TouchableOpacity  key={section.id} onPress={() => setSelectedSection(section.title)}>
                            <Text style={{padding: 10, fontWeight: selectedSection === section.title? 'bold': 'normal'}}>{section.title}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <SectionList
                    sections={sections}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id }
                    //renderSectionHeader={renderSectionHeader}
                    onEndReached={() => {
                        if (!loading && nextPagePost>0 && selectedSection==="posts") {
                            dispatch(fetchPost(id,user_id,nextPagePost));
                        // setNextPage(nextPage+1);
                        }
                        else if (!loading && nextPageComment>0 && selectedSection==="comments") {
                            dispatch(fetchComment(id,user_id,nextPageComment));
                        // setNextPage(nextPage+1);
                        }
                      }}
                      //onEndReachedThreshold={2}
                      ListFooterComponent={() => loading && <ActivityIndicator />}
                      refreshing={loading}
                      onRefresh={onRefresh}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //marginBottom: 100,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20
    },
    userInfo: {
        marginTop:30
    },
    userText: {
        fontWeight:'600',
        fontSize: 22
    }
});


// import {Text, View, FlatList, StyleSheet} from 'react-native';
// import { Link, useGlobalSearchParams, useLocalSearchParams, router } from 'expo-router';
// import { user_id } from '@/constants/Urls';

// export default function ProfileScreen(){
//     router.replace(`/profile/${user_id}`);
//     // return(
//     //     <View style={styles.page}>
//     //         {/* <Link href={{
//     //             pathname:"/profile/[id]",
//     //             params:{id:user_id}
//     //         }}></Link> */}
//     //         <p></p>
//     //     </View>
//     // );
// }

// const styles = StyleSheet.create({
//     page: {
//       flex: 1,
//       backgroundColor: 'white',
//     }
//   });