import { StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import tweets from '@/assets/data/tweets';
import Post from '@/components/Post';
import { fetchName } from '@/actions/search';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { Link } from 'expo-router';
import ErrorView from '@/components/ErrorView';
import { clearSearch } from '@/state/reducers/searchSlice';

// const DATA = [
//     { id: '1', name: 'Apple' },
//     { id: '2', name: 'Banana' },
//     { id: '3', name: 'Cherry' },
//     { id: '4', name: 'Date' },
//     // Add more data as needed
//   ];

export default function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const DATA = useSelector((state: RootState) => state.search.communityName);
  const error = useSelector((state: RootState) => state.search.error);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
  
    const onRefresh = () => {
      //dispatch(clearProfile());
      //setNextPage(initialPage);
      dispatch(fetchName());
      //setNextPage(nextPage+1);
    };
  
    useEffect(() => {
      dispatch(fetchName());
    },[]);

const handleSearch = (input:string) => {
    const filteredData = DATA.filter(item =>
    item.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearchQuery(input);
    setData(filteredData);
    console.log(filteredData);
};

const handleItemPress = (item) => {
    setSearchQuery(item.name);
    setData([]);
};
const retryAction = () => {
  dispatch(clearSearch());
  dispatch(fetchName());
};
if (error) {
  return (
    <ErrorView error={error} retryAction={retryAction} />
 );
}
  return (
    <View style={styles.page}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
            selectionColor="black"
          />
         {searchQuery !== '' && <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Link href={`/community/${item.id}`} asChild>
              <TouchableOpacity >
              <View style={styles.item}>
                <Text style={{color: 'black'}}>{item.name}</Text>
              </View>
              </TouchableOpacity>
              </Link>
            )}
          />}
    </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  input:{
    height: 40,
    fontSize: 18,
    color: '#333',
    // borderColor: 'gray',
    // borderWidth: 1,
    // marginBottom: 8,
    //paddingHorizontal: 8,
    //zIndex:0,
  },
  item:{
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 18,
    backgroundColor: 'white',
    //zIndex:1,
  },
});
