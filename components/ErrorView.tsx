import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

function ErrorView({ error, retryAction }) {
 if (!error) {
    return null; // Or render some other content
 }

 return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ color: 'black' }}>{error}</Text>
      <Button
        title="Retry"
        onPress={retryAction}
        color="black"
      />
    </View>
 );
}
// const styles = StyleSheet.create({
//     button: {
//       color: 'black',
//         // padding: 10,
//         // paddingHorizontal: 18,
//         borderRadius: 50,
    
//       },
//     //   buttonText:{
//     //     color: 'white',
//     //     fontWeight: '600',
//     //     fontSize: 16
//     //   },
// })
export default ErrorView;
