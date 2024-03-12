import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';



const UserList = ({image, text, id}) => {
  return(
    <Link href={`/profile/${id}`} asChild> 
    <Pressable style={{flexDirection:'row',alignItems:'center', borderColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,marginBottom:5}}>
      <Image
        src={image} 
        style={styles.userImage}
      />
      <Text style={{marginHorizontal:3,fontSize:22}}>{text}</Text>
    </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
    userImage: {
        width: 50,
        height: 50,
         borderRadius: 50,
         margin:10
      },

});

export default UserList;