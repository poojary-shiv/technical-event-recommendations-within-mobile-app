import React, {useState} from 'react'
import {StyleSheet, ScrollView, Image, TouchableOpacity, Button, View} from 'react-native'

import {
    Container,
    Form,
    Item,
    Input,
    Text,
    H3
} from 'native-base'

import ResetImg from '../assets/undraw_Control_panel_re_y3ar.png'


import Snackbar from 'react-native-snackbar'
import {connect} from 'react-redux'
import {signIn} from '../action/auth'
import propTypes from 'prop-types'

const ResetPassword = ({navigation}) => {

    const [email, setEmail] = useState('')
   

    // const doSignIn = () => {

    //   if (!email.trim()) {
    //     Snackbar.show({
    //       text: 'Please enter email ID',
    //       textColor: 'white',
    //       backgroundColor: "red"
    //   })
    //     return;
    //   }

    //   if (!password.trim()) {
    //     Snackbar.show({
    //       text: 'Please enter the passcode',
    //       textColor: 'white',
    //       backgroundColor: "red"
    //   })
    //     return;
    //   }
    //     signIn({email, password})
    // }


    return (
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <H3 style={styles.heading}>Reset Password</H3>
    
            <Image
              source={ResetImg}
              style={{width: null, height: 200, marginTop: 30}}
              resizeMode="contain"
            />
    
            <Form>
              <Item rounded style={styles.formItem} >
                <Input style={{paddingLeft:15}}
                  placeholder="Enter your current password"
                  secureTextEntry={true}
                //   onChangeText={(text) => setEmail(text)}
                />
              </Item>

              <View style={{height: 40}}>

              </View>
              <Item rounded style={styles.formItem}>
                <Input style={{paddingLeft:15}}
                  placeholder="Enter your new password"
                //   value={password}
                  secureTextEntry={true}
                //   onChangeText={(text) => setPassword(text)}
                />
              </Item>

              <Item rounded style={styles.formItem}>
                <Input style={{paddingLeft:15}}
                  placeholder="Confirm your new password"
                //   value={password}
                  secureTextEntry={true}
                //   onChangeText={(text) => setPassword(text)}
                />
              </Item>

              <View marginTop={15} style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch} >
                <Text style={styles.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              </View>

              
                
                
               
              
              
             
            </Form>
          </ScrollView>
        </Container>
      );
}




export default ResetPassword

const styles = StyleSheet.create({
    container: {
      
      flex: 1,
      justifyContent: 'flex-start',
    },
    heading: {
      textAlign: 'center',
      color: '#59595A',
      marginHorizontal: 5,
      marginTop: 30,
      fontWeight: 'bold'
    },
    formItem: {
      marginBottom: 20,
      width: 400,
      marginLeft: 5,
    },

    buttonView: {
      marginLeft: 5,
      marginBottom: 20,
      alignitems: 'center',
      justifyContent: 'center',
      
    },

    buttonTouch: {
      borderRadius: 50,
      height: 45,
      width: 400,
      backgroundColor: '#6C63FF',
    },
//#353238  #352C3E
    buttonTouchGray: {
      borderRadius: 50,
      height: 45,
      width: 400,
      backgroundColor: '#353238',
    },

    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 8,
    },
  });
  