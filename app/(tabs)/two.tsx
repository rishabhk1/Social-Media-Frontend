import { StyleSheet, TextInput, View, Pressable, Text, SafeAreaView, FlatList, TouchableOpacity, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import {Link, useRouter} from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchName } from '@/actions/createPost';
import { RootState, AppDispatch } from '@/state/store';
import { createPostAction } from '@/actions/createPost';
import { user_id } from '@/constants/Urls';
import { fetchPosts } from '@/actions/feed';
import { clearFeed } from '@/state/reducers/feedSlice';
import ErrorView from '@/components/ErrorView';
import { clearError } from '@/state/reducers/createPostSlice';

// const DATA = [
//   { id: '1', name: 'Apple' },
//   { id: '2', name: 'Banana' },
//   { id: '3', name: 'Cherry' },
//   { id: '4', name: 'Date' },
//   // Add more data as needed
// ];

export default function TabTwoScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const DATA = useSelector((state: RootState) => state.createPost.communityName);
  const error = useSelector((state: RootState) => state.createPost.error);
  const loading = useSelector((state: RootState) => state.createPost.loading);
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [description, setDescription] = useState("");  
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [justMounted, setJustMounted] = useState(true);
    // [
    // { id: '1', name: 'Apple' },
    // { id: '2', name: 'Banana' },
    // { id: '3', name: 'Cherry' },
    // { id: '4', name: 'Date' },
    // Add more data as needed
  // ]
  const onRefresh = () => {
    //dispatch(clearProfile());
    //setNextPage(initialPage);
    dispatch(fetchName());
    //setNextPage(nextPage+1);
  };


  useEffect(() => {
      console.log('mouny');
      dispatch(fetchName());
      setJustMounted(false);
  },[]);

  useEffect(() => {
    if (!loading && !justMounted) {
      router.back();
    }
  }, [loading, router]);

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
    setCommunityId(item.id)
    setData([]);
  };

  const onPostPress = () => {
    // console.warn('done', title, description); 
    if(title.trim() === ''){
      Alert.alert('Error!', 'Please enter title');
      return;
    }
    if(description.trim() === ''){
      Alert.alert('Error!', 'Please enter description');
      return;
    }
    if(communityId === ''){
      Alert.alert('Error!', 'Please select a community');
      return;
    }
    dispatch(createPostAction(communityId,title, description, user_id));
    if(error === null){
      setTitle("");
      setDescription("");
      setCommunityId("");
      setSearchQuery("");
    }
    // if(!title && !description && !communityId && !searchQuery && !loading){
    //   router.back();
    // }
    //dispatch(clearFeed());
    // if(!loading){
    //   //dispatch(fetchPosts(user_id,0));
    //   router.back();
    // }
    
  };
  const retryAction = () => {
    // Implement your retry logic here
    // For example, you might clear the error and attempt to fetch data again
    setJustMounted(false);
    dispatch(clearError());
    dispatch(fetchName());
    
    // Fetch data or perform other actions here
 };
  if (error) {
    return (
      <ErrorView error={error} retryAction={retryAction} />
   );
  }
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
            placeholder="select community"
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
            value={description}
            onChangeText={(newValue) => setDescription(newValue)}
            selectionColor="black"
            />
            {loading && <ActivityIndicator/>}
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
