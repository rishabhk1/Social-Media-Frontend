import { StyleSheet, FlatList,SectionList, View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {useState} from 'react';
import tweets from '@/assets/data/tweets';
import comments from '@/assets/data/comments';
import Post from '@/components/Post';
import Comment from '@/components/Comment';

export default function Profile({id}) {
    const [selectedSection, setSelectedSection] = useState('posts');
    const sections = [
        {
            id: '1',
            title: 'posts',
            data: tweets
        },
        {
            id: '2',
            title: 'comments',
            data: comments
        }
    ];
    const img = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/thumbnail.png';
    const username='ririririr';
    const reputation=45;
    const renderItem = ({item, section}) =>{
        if(selectedSection==='comments' && section.title==='comments'){
            return <Comment comment={item}/>;
        }
        else if(selectedSection==='posts' && section.title==='posts'){
            return <Post post={item} expand={false}/>;
        }
    };
    const renderSectionHeader = ({section}) => (
        <TouchableOpacity  key={section.id} onPress={() => setSelectedSection(section.title)}>
            <View style={{backgroundColor: selectedSection === section.title?'lightgray':'white'}}>
                <Text style={{padding: 10, fontWeight: selectedSection === section.title? 'bold': 'normal'}}>{section.title}</Text>
            </View>  
        </TouchableOpacity>
    );
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Image
                    src={img}
                    style={styles.profileImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userText}>{username}</Text>
                    <Text style={styles.userText}>reputation {reputation}</Text>
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