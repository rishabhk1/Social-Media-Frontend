import Post from '../../components/Post';
import tweets from '../../assets/data/tweets';
import comments from '../../assets/data/comments';
import Comment from '@/components/Comment';
import {Text, View, FlatList, StyleSheet, TextInput, ScrollView, Pressable} from 'react-native';
import { Link, useGlobalSearchParams } from 'expo-router';

export default function PostScreen(){
    const {id} = useGlobalSearchParams();
    const tweet = tweets.find((t => t.id === id));
    const comment= tweet?.comments?.map((id) => {
        const cs = comments.find((c) => c.id === id);
        return cs;
      });

    if(!tweet){
        return <Text>post {id} not found</Text>
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
                data={[tweet, ...comments]} 
                // keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (item.hasOwnProperty('user') ? ( //change user property parent
                    <Post post={item} expand={true} />
                ) : (
                    <Comment comment={item} />
                ))}
                contentContainerStyle={{paddingBottom:60}}
                
            />
            <Link href={`/addcomment/1`} asChild> 
                    
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