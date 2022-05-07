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

import SigninImg from '../assets/undraw_Programming_re_kg9v.png'

import Snackbar from 'react-native-snackbar'
import {connect} from 'react-redux'
import {signIn} from '../action/auth'
import propTypes from 'prop-types'

const SignIn = ({navigation, signIn}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const doSignIn = () => {

      if (!email.trim()) {
        Snackbar.show({
          text: 'Please enter email ID',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!password.trim()) {
        Snackbar.show({
          text: 'Please enter the passcode',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }
        signIn({email, password})
    }


    return (
        <Container style={styles.container}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <H3 style={styles.heading}>SingIn</H3>
    
            <Image
              source={SigninImg}
              style={{width: null, height: 200, marginTop: 30}}
              resizeMode="contain"
            />
    
            <Form>
              <Item rounded style={styles.formItem}>
                <Input style={{paddingLeft:15}}
                  placeholder="Enter your registerd E-mail ID"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Item>
              <Item rounded style={styles.formItem}>
                <Input style={{paddingLeft:15}}
                  placeholder="Enter your registerd passcode"
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                />
              </Item>

              <View marginTop={15} style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch} onPress={doSignIn}>
                <Text style={styles.buttonText}>SignIn</Text>
              </TouchableOpacity>
              </View>

              
                
                
                <Text style={{color: '#6E6E77', textAlign: 'center', marginBottom: 10, marginTop: 35}}>
                  Don't have an account?
                </Text>
              
              <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouchGray}  onPress={() => navigation.navigate('Participant')}>
                <Text style={styles.buttonText}>SignUp as Participant</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch} onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.buttonText}>SignUp as Organizer</Text>
              </TouchableOpacity>
              </View>
              
              
             
            </Form>
          </ScrollView>
        </Container>
      );
}

const mapDispatchToProps = {
    signIn: (data) => signIn(data)
}

SignIn.propTypes = {
    signIn: propTypes.func.isRequired
}


export default connect(null, mapDispatchToProps)(SignIn)

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
  