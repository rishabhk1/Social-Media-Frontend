import {useState} from 'react';
import { StyleSheet, TextInput, View, Pressable, Text, SafeAreaView, FlatList, TouchableOpacity, Platform, StatusBar } from 'react-native';
import {Link, useRouter} from 'expo-router';

const DATA = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Date' },
  // Add more data as needed
];

export default function TabTwoScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");  
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
    // [
    // { id: '1', name: 'Apple' },
    // { id: '2', name: 'Banana' },
    // { id: '3', name: 'Cherry' },
    // { id: '4', name: 'Date' },
    // Add more data as needed
  // ]
  
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

  const onPostPress = () => {
    console.warn('done', title, description); 
    setTitle("");
    setDescription("");
    router.back();
  };
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Link href="../" style={{fontSize: 18}}>cancel</Link>
          <Pressable onPress={onPostPress} style={styles.button}>
            <Text style={styles.buttonText}>post</Text>
          </Pressable>
        </View>
        <View>
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
          {(data.length ==0 || searchQuery === '' )  &&  <>
          <TextInput 
            placeholder="enter title" 
            multiline
            //numberOfLines={2}
            style={styles.title}
            value={title}
            onChangeText={(newValue) => setTitle(newValue)}
            selectionColor="black"
            />
          <TextInput 
            placeholder="enter description" 
            multiline
            //rnumberOfLines={5}
            style={styles.description}
            onChangeText={(newValue) => setDescription(newValue)}
            selectionColor="black"
            />
          </>}
        </View>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'black', // Set the background color as needed
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    // position: 'relative',
    
  },
  buttonContainer:{
    flexDirection: 'row',
    marginVertical: 10,
    // position: 'absolute',
    // bottom: 30,
    // left: 125,
    alignItems: 'center',
  
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    paddingHorizontal: 18,
    borderRadius: 50,

  },
  buttonText:{
    color: 'white',
    fontWeight: '600',
    fontSize: 16
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingVertical: 10,
    //height: Math.max(40, text.length * 15)
  },
  description: {
    fontSize: 18,
    color: '#333',
  }
});
