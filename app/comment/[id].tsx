
import tweets from '../../assets/data/tweets';
import Comment from '@/components/Comment';
import comments from '../../assets/data/comments';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import { useGlobalSearchParams } from 'expo-router';

export default function CommentScreen(){
    
    const {id} = useGlobalSearchParams();
    console.log(id);
    const commentHead = comments.find((t => t.id === id));
    const comment= commentHead?.comments?.map((id) => {
        const cs = comments.find((c) => c.id === id);
        return cs;
      });

    if(!commentHead){
        return <Text>post {id} not found</Text>
    }
    return (
        <View style={styles.page}>
            <Comment comment={commentHead}/>
            <View>
            {commentHead?.comments?.length!=0 && <FlatList 
                data={comment} 
                renderItem={({item}) => <Comment comment={item}/>}
            />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: 'white',
    }
  });