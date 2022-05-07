import React, {useState} from 'react'
import {StyleSheet, ScrollView, TouchableOpacity, View, Image, Text} from 'react-native'

import {
    Container,
    Form,
    Item,
    Input,
    Content,
} from 'native-base'


import Snackbar from 'react-native-snackbar'
import storage from '@react-native-firebase/storage'
import ProgressBar from 'react-native-progress/Bar'

import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

import { CheckBox, Icon } from 'react-native-elements';
//redux
import propTypes from 'prop-types'
import {participant} from '../action/auth'
import {connect} from 'react-redux'

const logo = require('../assets/undraw_profile_pic_ic5t.png');
const exampleImageUri = Image.resolveAssetSource(logo).uri
//const defaultImages = {logo}

const Participant = ({participant}) => {

 // const [preferences, setPreferences] = useState([]);
  
 const [imagep, setImagep] = useState(exampleImageUri)
 const [imageUploadingp, setImageUploadingp] = useState(false)
    const [uploadStatusp, setUploadStatusp] = useState(null)
    const [namep, setNamep] = useState('')
    const [emailp, setEmailp] = useState('')
    const [mobilep, setMobilep] = useState('')
    const [passwordp, setPasswordp] = useState('')
    const [passwordConfirmp, setPasswordConfirmp] = useState('')
    const [descriptionp, setDescriptionp] = useState('')
    
    const [skillsp, setSkillsp] = useState('')
    let preferences = [];

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);
    const [check7, setCheck7] = useState(false);
    
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
      setImageUploadingp(true)
      const reference = storage().ref(response.fileName)

      const task = reference.putFile(response.path)
      task.on('state_changed', (taskSnapshot) => {
          const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

          setUploadStatusp(percentage)
      })

      task.then(async () => {
          const url = await reference.getDownloadURL()

          setImagep(url)
          setImageUploadingp(false)
      })
  }

   

    const doParticipate = async () => {

      if (!namep.trim()) {
        Snackbar.show({
          text: 'Please enter your name',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!emailp.trim()) {
        Snackbar.show({
          text: 'Please provide email ID',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      var patternForEmail  = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!patternForEmail.test(emailp)) {
        Snackbar.show({
          text: 'Invalid Email-ID',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!mobilep.trim()) {
        Snackbar.show({
          text: 'Please provide Mobile Number',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      var patternForMobile  = /^[789]\d{9}$/
      if (!patternForMobile.test(mobilep)) {
        Snackbar.show({
          text: 'Invalid Mobile Number',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!passwordp.trim()) {
        Snackbar.show({
          text: 'Please enter password',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      var regularExpression  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      if (!regularExpression.test(passwordp)) {
        Snackbar.show({
          text: 'Invalid Password',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!passwordConfirmp.trim()) {
        Snackbar.show({
          text: 'Please confirm password',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (passwordp != passwordConfirmp) {
        Snackbar.show({
          text: 'Entered password\'s don\'t match',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!descriptionp.trim()) {
        Snackbar.show({
          text: 'Please provide profile description',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!skillsp.trim()) {
        Snackbar.show({
          text: 'Please enter your skills',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


        if(check1==true) {
          preferences.push("Bug Bounty Program");
        }
        if(check2==true) {
          preferences.push("Community Meet");
        }
        if(check3==true) {
          preferences.push("Conference");
        }
        if(check4==true) {
          preferences.push("Hackathon");
        }
        if(check5==true) {
          preferences.push("Seminar");
        }
        if(check6==true) {
          preferences.push("Webinar");
        }
        if(check7==true) {
          preferences.push("Workshop");
        }
        
        let listPreferences = [...new Set(preferences)];

        console.log(preferences);

        if (listPreferences.length===0) {
          Snackbar.show({
            text: 'Please select atleast one preference',
            textColor: 'white',
            backgroundColor: "red"
        })
          return;
        }
      
        participant({namep, emailp, mobilep, passwordp, descriptionp, skillsp, listPreferences, imagep})
    }



    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={chooseImage}>
                  <Image style={styles.imageFormat} source={{uri:imagep}} />
                </TouchableOpacity>
              </View>
    
              {imageUploadingp && (
                <ProgressBar progress={uploadStatusp} color="#6C63FF" style={styles.progress} />
              )}
    
              
    
             
    
              <Form>
                <Item rounded style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    placeholder="Name"
                    value={namep}
                   
                    onChangeText={(text) => setNamep(text)}
                  />
                </Item>

                <Item rounded style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    placeholder="Email-ID"
                    value={emailp}
                   
                    onChangeText={(text) => setEmailp(text)}
                  />
                </Item>

                <Item rounded style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    placeholder="Mobile number"
                    value={mobilep}
                   
                    onChangeText={(text) => setMobilep(text)}
                  />
                </Item>
                <Item rounded style={styles.formItem}>
                  <Input
                    placeholder="Password"
                    value={passwordp}
                    secureTextEntry={true}
                   
                    onChangeText={(text) => setPasswordp(text)}
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
                    value={passwordConfirmp}
                    secureTextEntry={true}
                   
                    onChangeText={(text) => setPasswordConfirmp(text)}
                  />
                </Item>

               
                <Item regular style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
            
                    placeholder="Profile Description"
                    value={descriptionp}
                   
                    onChangeText={(text) => setDescriptionp(text)}
                  />
                </Item>
                <Item regular style={styles.formItem} style={{marginBottom: 20}}>
                  <Input
                    height= {40}
                    placeholder="Skills"
                    value={skillsp}
                    
                    onChangeText={(text) => setSkillsp(text)}
                  />
                </Item>
                <Text style={styles.preferencesText}>Set your preferences:</Text>

                <CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Bug Bounty Program"
                  checkedTitle="Bug Bounty Program added!"
                  uncheckedColor="#6C63FF"
                  checked={check1}
                  onPress={() => setCheck1(!check1)}
                />

<CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Community Meet"
                  checkedTitle="Community Meet added!"
                  uncheckedColor="#6C63FF"
                  checked={check2}
                  onPress={() => setCheck2(!check2)}
                />

<CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Conference"
                  checkedTitle="Conference added!"
                  uncheckedColor="#6C63FF"
                  checked={check3}
                  onPress={() => setCheck3(!check3)}
                />

<CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Hackathon"
                  checkedTitle="Hackathon added!"
                  uncheckedColor="#6C63FF"
                  checked={check4}
                  onPress={() => setCheck4(!check4)}
                />

<CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Seminar"
                  checkedTitle="Seminar added!"
                  uncheckedColor="#6C63FF"
                  checked={check5}
                  onPress={() => setCheck5(!check5)}
                />

<CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Webinar"
                  checkedTitle="Webinar added!"
                  uncheckedColor="#6C63FF"
                  checked={check6}
                  onPress={() => setCheck6(!check6)}
                />

<CheckBox
                  size={35}
                  checkedColor="#6C63FF"
                  title="Workshop"
                  checkedTitle="Workshop added!"
                  uncheckedColor="#6C63FF"
                  checked={check7}
                  onPress={() => setCheck7(!check7)}
                />

                
                


               


              <View marginTop={15} style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch} onPress={doParticipate}>
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
    participant: (data) => participant(data)
}

Participant.propTypes = {
    participant: propTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Participant)



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
    progress: {width: null, marginBottom: 20, color: '#6C63FF'},
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

    preferencesText: {
      marginTop: 15,
      marginBottom: 5,
      paddingLeft: 9,
      fontSize: 18,
      fontWeight: '600',
      color: '#6C63FF',
    },


    

  });

