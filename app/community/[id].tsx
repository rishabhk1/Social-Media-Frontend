import { StyleSheet, FlatList,SectionList, View, Image, Text, TouchableOpacity, SafeAreaView, Pressable, Modal, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Link, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import tweets from '@/assets/data/tweets';
import comments from '@/assets/data/comments';
import Post from '@/components/Post';
import UserList from '@/components/UserList';
import Comment from '@/components/Comment';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import {fetchPostComment, appealFromCommunityAction, fetchPost, fetchComment, upvoteFromCommunityAction, undoUpvoteFromCommunityAction,deleteFromCommunityAction, undoDownvoteFromCommunityAction, downvoteFromCommunityAction, joinCommunityAction, unjoinCommunityAction } from '@/actions/community'
import { clearCommunity } from '@/state/reducers/communitySlice';
import { user_id } from '@/constants/Urls';
// import {
//     toggleMembers, toggleMod
// } from "../../state/reducers/feedSlice";

const initialPagePost = 0;
const intialPageApplead=0;

export default function CommunityHome() {
    const {id} = useLocalSearchParams();
    console.log(id);
    // const dispatch = useDispatch<AppDispatch>();
    // const isMemberModalVisible = useSelector((state: RootState) => state.modal.members);
    // const isModModalVisible = useSelector((state: RootState) => state.modal.mod);
    const dispatch = useDispatch<AppDispatch>();
    const posts = useSelector((state: RootState) => state.community.posts);
    const appealed = useSelector((state: RootState) => state.community.appealed);
    const loading = useSelector((state: RootState) => state.community.loading);
    const nextPagePost = useSelector((state: RootState) => state.community.nextPagePost);
    const nextPageAppealed = useSelector((state: RootState) => state.community.nextPageAppealed);
    const communityId = useSelector((state: RootState) => state.community.id);
    const name = useSelector((state: RootState) => state.community.name);
    const description = useSelector((state: RootState) => state.community.description);
    const moderators = useSelector((state: RootState) => state.community.moderators);
    const members = useSelector((state: RootState) => state.community.members);
    const joined = useSelector((state: RootState) => state.community.joined);

    const error  = useSelector((state: RootState) => state.community.error);


    const [isMemberModalVisible, setMemberModalVisible] = useState(false);
    const [isModModalVisible, setModModalVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState('posts');
    const sections = [
        {
            id: '1',
            title: 'posts',
            data: posts
        },
        {
            id: '2',
            title: 'appealed',
            data: appealed
        }
    ];
    const img = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png';
    // const username='ririririr';
    // const members=45;
    // const moderators=5;
    // let key=0
    // useFocusEffect(React.useCallback(() => {
    //    key++;
    // },[]));
    const onJoinPress = () => {
        if(joined){
            dispatch(unjoinCommunityAction(user_id,id));
        }
        else{
            dispatch(joinCommunityAction(user_id, id));
        }
    };
    const onRefresh = () => {
    dispatch(clearCommunity());
    //setNextPage(initialPage);
    if(loading) return;
    dispatch(fetchPostComment(id, user_id, initialPagePost, intialPageApplead));
    //setNextPage(nextPage+1);
    };

    useEffect(() => {
        dispatch(clearCommunity());
    if(loading) return;
    dispatch(fetchPostComment(id, user_id, initialPagePost, intialPageApplead));
    //setNextPage(nextPage+1);
    },[]);
    // const changeMods = () => {
    //     setModModalVisible(!isModModalVisible);
    //     //dispatch(toggleMod());
    // };

    // const changeMembers = () => {
    //     console.log(isMemberModalVisible);
    //     setMemberModalVisible(!isMemberModalVisible);
        
    //     //dispatch(toggleMembers());
    // };

    const renderItem = ({item, section}) =>{
        if(selectedSection==='appealed' && section.title==='appealed'){

            if(item.hasOwnProperty('comments')){
                return <Post 
                post={item} 
                expand={false}
                upvoteFn={upvoteFromCommunityAction}
                downvoteFn={downvoteFromCommunityAction}
                undoUpvoteFn={undoUpvoteFromCommunityAction}
                undoDownvoteFn={undoDownvoteFromCommunityAction}      
                deleteFn={deleteFromCommunityAction}
                appealFn={appealFromCommunityAction}
                isModerator={moderators.some(moderator => moderator.id === user_id)}
                />;
            }
            return <Comment 
                        comment={item} 
                        upvoteFn={upvoteFromCommunityAction}
                        downvoteFn={downvoteFromCommunityAction}
                        undoUpvoteFn={undoUpvoteFromCommunityAction}
                        undoDownvoteFn={undoDownvoteFromCommunityAction}      
                        deleteFn={deleteFromCommunityAction}
                        appealFn={appealFromCommunityAction}
                        isModerator={moderators.some(moderator => moderator.id === user_id)}
                        />;
        }
        else if(selectedSection==='posts' && section.title==='posts'){
            return <Post 
                    post={item} 
                    expand={false}
                    upvoteFn={upvoteFromCommunityAction}
                    downvoteFn={downvoteFromCommunityAction}
                    undoUpvoteFn={undoUpvoteFromCommunityAction}
                    undoDownvoteFn={undoDownvoteFromCommunityAction}  
                    deleteFn={deleteFromCommunityAction}
                    appealFn={appealFromCommunityAction}
                    />;
        }
    };
    const renderSectionHeader = ({section}) => (
        <TouchableOpacity  key={section.id} onPress={() => setSelectedSection(section.title)}>
            <View style={{backgroundColor: selectedSection === section.title?'lightgray':'white'}}>
                <Text style={{padding: 10, fontWeight: selectedSection === section.title? 'bold': 'normal'}}>{section.title}</Text>
            </View>  
        </TouchableOpacity>
    );
    //console.log(isMemberModalVisible);
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Image
                    src={img}
                    style={styles.profileImage}
                />
                <View>
                <View style={styles.userInfo}>
                    <Text style={styles.userText}>{name}</Text>
                    <View style={styles.members}>
                        <TouchableOpacity style={styles.membersText}>
                            <Link  href="/popup/members">
                            <Text style={styles.membersText}>{members.length} members</Text>
                            </Link>
                        </TouchableOpacity>
                        {/* <Modal
                                animationType="fade"
                                key={key}
                                transparent={false}
                                visible={isMemberModalVisible}
                                //onRequestClose={changeMembers}
                                >
                                <View style={styles.modalContainer}>
                                <View>
                                    <Text style={styles.modalHeader}>members</Text>
                                </View>
                                <FlatList
                                    data={tweets}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => <UserList image={item.user.image} text={item.user.name} id={item.id}/>}
                                />
                                <TouchableOpacity onPress={changeMembers} style={styles.closeButton}>
                                    <Text style={{color: 'white'}}>Close</Text>
                                </TouchableOpacity>
                                </View>
                            </Modal> */}
                        <TouchableOpacity>
                            <Link  href="/popup/moderators">
                            <Text style={styles.moderatorsText}>{moderators.length} moderators</Text>
                            </Link>
                        </TouchableOpacity>
                            {/* <Modal
                                animationType="fade"
                                transparent={false}
                                visible={isModModalVisible}
                                onRequestClose={changeMods}
                                >
                                <View style={styles.modalContainer}>
                                <View>
                                    <Text style={styles.modalHeader}>moderators</Text>
                                </View>
                                <FlatList
                                    data={tweets}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item }) => <UserList image={item.user.image} text={item.user.name} id={item.id}/>}
                                />
                                <TouchableOpacity onPress={changeMods} style={styles.closeButton}>
                                    <Text style={{color: 'white'}}>Close</Text>
                                </TouchableOpacity>
                                </View>
                            </Modal> */}
                    </View>
                </View>
                    <Pressable onPress={onJoinPress} style={styles.button}>
                        <Text style={styles.buttonText}>{joined?'unjoin':'join'}</Text>
                    </Pressable>
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
                        else if (!loading && nextPageAppealed>0 && selectedSection==="appealed") {
                            dispatch(fetchComment(id,user_id,nextPageAppealed));
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
        marginTop:15,
        marginLeft: 15,
        // backgroundColor: 'red'
    },
    userText: {
        fontWeight:'600',
        fontSize: 22
    },
    members: {
        flexDirection: 'row',
        marginBottom:5
    },
    membersText:{
        fontSize: 18,
        marginRight: 5
    },
    moderatorsText:{
        fontSize: 18
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        paddingHorizontal: 18,
        borderRadius: 50,
        width: 85,
        justifyContent: 'center', // Center content horizontally
        alignItems: 'center',   // Center content vertically
        marginLeft: 6
        
    
    },
      buttonText:{
        color: 'white',
        fontWeight: '600',
        fontSize: 16
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
        width:70,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

      },
      modalContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
        // backgroundColor: 'white',
        // width: '70%', // Set the width of the modal
        // height: '50%', // Set the height of the modal
        // marginLeft: '15%',
        // marginTop: '30%',
        // backgroundColor: 'rgba(0,0,0,0.5)'
      },
      modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
      },
});