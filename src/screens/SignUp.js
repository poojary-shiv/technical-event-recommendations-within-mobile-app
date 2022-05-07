import React, {useState} from 'react'
import {StyleSheet, ScrollView, TouchableOpacity, View, Image, Text} from 'react-native'

import {
    Container,
    Form,
    Item,
    Input,
    Button,
    Thumbnail,
    Content,
    TextArea,
} from 'native-base'
import Snackbar from 'react-native-snackbar'
import storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar'

import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

//redux
import propTypes from 'prop-types'
import {signUp} from '../action/auth'
import {connect} from 'react-redux'

const logo = require('../assets/undraw_quite_town_mg2q.png');
const exampleImageUri = Image.resolveAssetSource(logo).uri
//const defaultImages = {logo}

const SignUp = ({signUp}) => {
  const [image, setImage] = useState(exampleImageUri)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [description, setDescription] = useState('')
    
    const [address, setAddress] = useState('')
    

    const [imageUploading, setImageUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState(null)

    const chooseImage = async () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)

            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                console.log(response)
                uploadImage(response)
              }
             
               
        })
    }


    const uploadImage = async (response) => {
        setImageUploading(true)
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.path)
        task.on('state_changed', (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

            setUploadStatus(percentage)
        })

        task.then(async () => {
            const url = await reference.getDownloadURL()

            setImage(url)
            setImageUploading(false)
        })
    }

    const doSignUp = async () => {

      var collegeArray = ['adminrgit@mctrgit.ac.in','dean_ap@vjti.ac.in','crce@frcrce.ac.in',' office@xavier.ac.in','principal@spit.ac.in'];

      if (!name.trim()) {
        Snackbar.show({
          text: 'Please enter Organization\'s name',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!email.trim()) {
        Snackbar.show({
          text: 'Please provide email ID',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }
      
      var patternForEmail  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!patternForEmail.test(email)) {
        Snackbar.show({
          text: 'Invalid Email-ID',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!collegeArray.includes(email)) {
        Snackbar.show({
          text: 'Email verification failed. Kindly reach out to projectfinalyear2022@gmail.com.',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      

      if (!password.trim()) {
        Snackbar.show({
          text: 'Please enter password',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      var regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!regularExpression.test(password)) {
        Snackbar.show({
          text: 'Invalid Password',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!passwordConfirm.trim()) {
        Snackbar.show({
          text: 'Please confirm password',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (password != passwordConfirm) {
        Snackbar.show({
          text: 'Entered password\'s don\'t match',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!address.trim()) {
        Snackbar.show({
          text: 'Please enter address',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (password != passwordConfirm) {
        Snackbar.show({
          text: 'Entered password\'s don\'t match',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }
        signUp({name, description, address, email, password, image})
    }



    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.imageContainer}>
                <TouchableOpacity onPress={chooseImage}>
                  <Image style={styles.imageFormat} source={{uri:image}} />
                </TouchableOpacity>
              </View>
    
              {imageUploading && (
                <ProgressBar progress={uploadStatus} color="#6C63FF" style={styles.progress} />
              )}
    
              <Form>
                <Item rounded style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    placeholder="Organization's name"
                    value={name}
                   
                    onChangeText={(text) => setName(text)}
                  />
                </Item>
                <Item rounded style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    placeholder="Email"
                    value={email}
                   
                    onChangeText={(text) => setEmail(text)}
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                    placeholder="Password"
                    value={password}
                    secureTextEntry={true}
                   
                    onChangeText={(text) => setPassword(text)}
                  />
                </Item>

                <Item>
                  <Text style={styles.passMsg}>1. Minimum 8 characters{'\n'}
                    2. Atleast 1 number, 1 upper & lower character and 1 symbol
                  </Text>
                </Item>

                <Item rounded style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    placeholder="Confirm Password"
                    value={passwordConfirm}
                    secureTextEntry={true}
                   
                    onChangeText={(text) => setPasswordConfirm(text)}
                  />
                </Item>

               
                <Item regular style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
            
                    placeholder="Brief description..."
                    value={description}
                   
                    onChangeText={(text) => setDescription(text)}
                  />
                </Item>
                <Item regular style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    height= {40}
                    placeholder="Address"
                    value={address}
                    
                    onChangeText={(text) => setAddress(text)}
                  />
                </Item>
                
               

              <View marginTop={15} style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch} onPress={doSignUp}>
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
              </View>
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
    
}

const mapDispatchToProps = {
    signUp: (data) => signUp(data)
}

SignUp.propTypes = {
    signUp: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(SignUp)



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'flex-start',
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 5,
      marginBottom: 30,
    },
    imageFormat: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2, 
      borderColor: '#353238',
    },
    progress: {width: null, marginBottom: 20},
    formItem: {
      height: 50,
    },

    buttonView: {
      marginLeft: 1,
      marginBottom: 20,
      alignitems: 'center',
      justifyContent: 'center',
      
    },

    buttonTouch: {
      borderRadius: 50,
      height: 45,
      width: 390,
      backgroundColor: '#6C63FF',
    },

    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 8,
    },

    passMsg: {
      fontSize: 11,
      marginBottom: 20,

    },
  });