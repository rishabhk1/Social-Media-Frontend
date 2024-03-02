import { StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { Text, View } from '@/components/Themed';
import tweets from '@/assets/data/tweets';
import Post from '@/components/Post';

const DATA = [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Cherry' },
    { id: '4', name: 'Date' },
    // Add more data as needed
  ];

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([]);
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
              <TouchableOpacity onPress={() => handleItemPress(item)}>
              <View style={styles.item}>
                <Text>{item.name}</Text>
              </View>
              </TouchableOpacity>
            )}
          />}
    </View>
    
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
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
    color: '#333',
    //zIndex:1,
  },
});
