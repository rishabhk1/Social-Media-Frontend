import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type IconButtonProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons >['name'];
  text?: string;
};
const IconButton = ({icon, text}: IconButtonProps) => {
  return(
    <View style={{flexDirection:'row',alignItems:'center', marginRight:40}}>
      <MaterialCommunityIcons  name={icon} size={22} color="gray"/>
      <Text style={{marginHorizontal:3,fontSize:12, color:"gray"}}>{text}</Text>
      {icon==='arrow-up' && <MaterialCommunityIcons  name={'arrow-down'} size={22} color="gray"/>}
    </View>
  );
};

const style = StyleSheet.create({
  userImage: {
    width: 50,
    height: 50,
     borderRadius: 50,
  },
});

export default IconButton;