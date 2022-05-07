import React, { useState } from 'react';
import {StyleSheet, ScrollView, Image, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Container,
  Content,
  
  Text,


} from 'native-base';



const Support = () => {

    return (
        <Container style={styles.container}>
          <Content padder>
         
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

            <Text style={{fontSize: 20, color: '#6C63FF', textAlign: 'left', fontWeight: 'bold', paddingBottom: 5, marginTop: 20}}>Support</Text>
            
            <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

<View style={{paddingTop: 15}}>
    <Text style={{color: '#353238', lineHeight: 19}}>For any queries, problems or feedback please do write to:</Text>
</View>

<View>
    <Text style={{color: '#6C63FF', fontWeight: 'bold', paddingVertical: 10}}>projectfinalyear2022@gmail.com</Text>
</View>

<View>
    <Text>Thank you.</Text>
</View>
             
              
              
             
            </ScrollView>
          </Content>
        </Container>
      );
    
}



export default Support



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
 
  });
  