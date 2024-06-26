import { StyleSheet, TextInput, View, Pressable, Text, SafeAreaView, FlatList, TouchableOpacity, Platform, StatusBar, Alert, ActivityIndicator } from 'react-native';
import {Link, useRouter} from 'expo-router';
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState, AppDispatch } from '@/state/store';
import { fetchPostComment } from '@/actions/postComment';
import { fetchPostComment as  fetchCommentComment } from '@/actions/comment';
// import { user_id } from '@/constants/Urls';
import { createCommentAction } from '@/actions/createComment';
import ErrorView from '@/components/ErrorView';
import { clearCreateComment } from '@/state/reducers/createCommentSlice';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';


export default function AddComment() {
  const colorScheme = useColorScheme();
  const {parentId} = useLocalSearchParams();
  //console.warn(parentId);  
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.createComment.error);
  const loading = useSelector((state: RootState) => state.createComment.loading);
  const user_id= useSelector((state: RootState) => state.login.userId);
  const router = useRouter();
  const [text, setText] = useState("");
  const [justMounted, setJustMounted] = useState(true);
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
  useEffect(() => {
    setJustMounted(false);
  },[]);

  useEffect(() => {
  if (!loading && !justMounted) {
    router.back();
  }
  }, [loading, router]);

  const onPostPress = () => {
    if(text.trim() === ''){
      Alert.alert('Error!', 'Please enter description');
      return;
    }
    dispatch(createCommentAction(parentId, text, user_id))
    if(error === null){
      setText("");
    }
    // if(parentId.startsWith('p')){
    //   dispatch(fetchPostComment( user_id, parentId,0));
    // }
    // else{
    //   dispatch(fetchCommentComment( user_id, parentId, 0));
    // }
  };
  const retryAction = () => {
    // Implement your retry logic here
    // For example, you might clear the error and attempt to fetch data again
    setJustMounted(false);
    dispatch(clearCreateComment());
    
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
            <Text style={styles.buttonText}>comment</Text>
          </Pressable>
        </View>
        <View>
          { <>
          <TextInput 
            placeholder="enter comment" 
            multiline
            //numberOfLines={2}
            style={styles.title}
            value={text}
            onChangeText={(newValue) => setText(newValue)}
            selectionColor="black"
            />
          </>}
          {loading && <ActivityIndicator/>}
        </View>
      </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: statusColor, // Set the background color as needed
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
