import { StyleSheet, TextInput, View, Pressable, Text, SafeAreaView, FlatList, TouchableOpacity, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import {Link, useRouter} from 'expo-router';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { fetchPostComment } from '@/actions/postComment';
import { fetchPostComment as  fetchCommentComment } from '@/actions/comment';
import { user_id } from '@/constants/Urls';
import { fetchName } from '@/actions/createCommunity';
import { createCommentAction } from '@/actions/createComment';
import { createCommunityAction } from '@/actions/createCommunity';
import ErrorView from '@/components/ErrorView';
import { clearCreateCommunity } from '@/state/reducers/createCommunitySlice';

export default function CreateCommunity() {
  //const {parentId} = useLocalSearchParams();
  //console.warn(parentId);  
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.createCommunity.error);
  const loading = useSelector((state: RootState) => state.createCommunity.loading);
  const DATA = useSelector((state: RootState) => state.createCommunity.communityName);
  const router = useRouter();
  const [text, setText] = useState("");
  const[description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [justMounted, setJustMounted] = useState(true); // State to track if the component has just mounted
//   const [searchQuery, setSearchQuery] = useState('');
//   const [data, setData] = useState([]);
    // [
    // { id: '1', name: 'Apple' },
    // { id: '2', name: 'Banana' },
    // { id: '3', name: 'Cherry' },
    // { id: '4', name: 'Date' },
    // Add more data as needed
  // ]
  
// console.log(data.length);
// console.log(searchQuery);
//   const handleSearch = (input:string) => {
//     const filteredData = DATA.filter(item =>
//       item.name.toLowerCase().includes(input.toLowerCase())
//     );
//     setSearchQuery(input);
//     setData(filteredData);
//     console.log(filteredData);
//   };

//   const handleItemPress = (item) => {
//     setSearchQuery(item.name);
//     setData([]);
//   };
    const onRefresh = () => {
        //dispatch(clearProfile());
        //setNextPage(initialPage);
        dispatch(fetchName());
        //setNextPage(nextPage+1);
    };

    useEffect(() => {
        dispatch(fetchName());
        setJustMounted(false);
    },[]);

    useEffect(() => {
      if (!loading && !justMounted) {
        router.back();
      }
   }, [loading, router]);

    const handleSearch = (input:string) => {
        // const filteredData = DATA.filter(item =>
        //   item.name.toLowerCase().includes(input.toLowerCase())
        // );
        // setSearchQuery(input);
        // setData(filteredData);
        // console.log(filteredData);
        const check=DATA.some(item => item.name.trim().toLowerCase() === input.trim().toLowerCase());
        if(input.trim() === ''){
            setMessage('');
        }
        else if(check){
            setMessage("community name already exists");
        }
        else{
            setMessage("community name is available");
        }
      };


  const onPostPress = () => {
    if(text.trim() === ''){
      Alert.alert('Error!', 'Please enter community name');
      return;
    }
    if(description.trim() === ''){
        Alert.alert('Error!', 'Please enter description');
        return;
    }
    dispatch(createCommunityAction(user_id, text, description))
    if(error === null){
      setText("");
      setDescription("");
    }
    // if(parentId.startsWith('p')){
    //   dispatch(fetchPostComment( user_id, parentId,0));
    // }
    // else{
    //   dispatch(fetchCommentComment( user_id, parentId, 0));
    // }
    //router.back();
  };
  const retryAction = () => {
    // Implement your retry logic here
    // For example, you might clear the error and attempt to fetch data again
    setJustMounted(false);
    dispatch(clearCreateCommunity());
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
            <Text style={styles.buttonText}>create</Text>
          </Pressable>
        </View>
        <View>
          { <>
        <Text style={styles.message}>{message}</Text>
          <TextInput 
            placeholder="enter community name" 
            multiline
            //numberOfLines={2}
            style={styles.title}
            value={text}
            onChangeText={(newValue) => {setText(newValue); handleSearch(newValue)}}
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
          </>}
          {(loading && <ActivityIndicator/>)}
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
  },
  message:{
    fontSize: 10
  }
});
