import { StyleSheet, FlatList } from 'react-native';

import { Text, View } from '@/components/Themed';
import tweets from '@/assets/data/tweets';
import Post from '@/components/Post';


export default function TabOneScreen() {
  return (
    <View style={styles.page}>
      <FlatList 
        data={tweets} 
        renderItem={({item}) => <Post post={item} expand={false}/>}
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
