import {Text, View, FlatList, StyleSheet} from 'react-native';
import { useGlobalSearchParams } from 'expo-router';
import Profile from '../(tabs)/profile';
export default function ProfileScreen(){
    const {id} = useGlobalSearchParams();
    return(
        <View style={styles.page}>
            <Profile id={id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: 'white',
    }
  });