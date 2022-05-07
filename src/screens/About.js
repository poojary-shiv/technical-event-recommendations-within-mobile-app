import React, { useState, useEffect } from 'react';
import {StyleSheet, ScrollView, Image, TouchableOpacity, View} from 'react-native';

import {getUsers} from '../action/user';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import database from '@react-native-firebase/database';
import {
  Container,
  Content,
  
  Text,


} from 'native-base';
import { createIconSetFromFontello } from 'react-native-vector-icons';



const About = ({getUsers, usersState}) => {

  var myUsers;
  var countOfOrganizers=0;
  var countOfParticipants=0;
  myUsers = usersState.users;
  if(myUsers){
  myUsers.forEach((element, index, array) => {
    console.log(element.type); // 100, 200, 300
    if(element.type=='organizer'){
            countOfOrganizers+=1;
      
          }
          else{
            countOfParticipants+=1;
          }
   
});}

console.log('Organizers='+countOfOrganizers+' participants=' +countOfParticipants);
  
   
  useEffect(() => {
    console.log("EVERY USER", usersState.users)
  getUsers();
}, []);

// if(usersState.users){
//   const keys = Object.keys(usersState.users);
//   console.log(keys)
//   keys.forEach((key, index) => {
//     console.log(key.type)
//     
// });

// 

// }



    
  
   





    return (
        <Container style={styles.container}>
          <Content padder>
         
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

            <Text style={{fontSize: 20, color: '#6C63FF', textAlign: 'left', fontWeight: 'bold', paddingBottom: 5, marginTop: 20}}>About Us</Text>
            
            <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

<View style={{paddingTop: 15}}>
    <Text style={{color: '#353238', lineHeight: 19, paddingBottom: 10}}>We provide a platform for event organizers to spread a word about their event and for tech enthusiasists to come across these events as per their interests.</Text>
    <Text style={{color: '#353238', lineHeight: 19, paddingBottom: 10}}>Organizers can post about various events like Bug Bounty Programs, Community Meets, Conferences, Hackathons, Seminars, Webinars and Workshops.</Text>
    <Text style={{color: '#353238', lineHeight: 19, paddingBottom: 10}}>Participants have the choice of setting up their preferences for events and get suggestions accordingly.</Text>
</View>

<View>
        <Text style={{color: '#353238', lineHeight: 19, paddingTop: 20}}>Currently, we are a community of:</Text>
</View>

<View style={{flexDirection: 'row'}}>
    <View style={{flexDirection: 'column', marginLeft: 60}}>
        <Text style={{textAlign: 'center', marginVertical: 15, fontSize: 22, fontWeight: 'bold', color: '#6C63FF', marginTop: 25}}>{countOfOrganizers}

        </Text>
        <Text style={{textAlign: 'center', color: '#6C63FF', fontWeight: '700'}}>
Organizers
        </Text>

    </View>

    <View style={{flexDirection: 'column', marginLeft: 60}}>

    <Text style={{textAlign: 'center', marginVertical: 15, fontSize: 22, fontWeight: 'bold', color: '#6C63FF', marginTop: 25}}>{countOfParticipants}

</Text>
<Text style={{textAlign: 'center', color: '#6C63FF', fontWeight: '700'}}>
Participants
</Text>

    </View>
</View>
             
              
              
             
            </ScrollView>
          </Content>
        </Container>
      );
    
}



const mapStateToProps = (state) => ({
  usersState: state.user,
 
});

const mapDispatchToProps = {
  getUsers,
};

About.propTypes = {
  getUsers: propTypes.func.isRequired,
  usersState: propTypes.object.isRequired,
 
};

export default connect(mapStateToProps, mapDispatchToProps)(About);




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
 
  });
  