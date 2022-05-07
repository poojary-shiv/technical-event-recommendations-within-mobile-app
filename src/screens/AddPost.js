import React, { useState } from 'react';
import {StyleSheet, ScrollView, Image, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  H3,
  Textarea,
  Stack,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,

} from 'native-base';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button} from 'react-native-elements'
import Snackbar from 'react-native-snackbar'
import ProgressBar from 'react-native-progress/Bar'

import database from '@react-native-firebase/database' 

import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-picker'
import {options} from '../utils/options'

//redux
import {connect} from 'react-redux'
import propTypes from 'prop-types'
import shortid from 'shortid'


const AddPost = ({navigation, userState}) => {

  const [type, setType] = useState('');

 

  const [namepost, setNamePost] = React.useState('');
  const [venuepost, setVenuePost] = React.useState('');
  const [addresspost, setAddressPost] = React.useState('');
  const [maxregistrations, setMaxRegistrations] = React.useState('');
  const [descriptionpost, setDescriptionPost] = React.useState('');
  const [imagepost, setImagePost] = useState(null)

  const [link, setLink] = React.useState('');
  const [whatsapp, setWhatsapp] = React.useState('');
  const [twitter, setTwitter] = React.useState('');
  const [instagram, setInstagram] = React.useState('');
  const [facebook, setFacebook] = React.useState('');
  

    const [imageUploadingpost, setImageUploadingPost] = useState(false)
    const [uploadStatuspost, setUploadStatusPost] = useState(null)

    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dateMsg, setDateMsg] = useState('');
    const [timeMsg, setTimeMsg] = useState('');
    const [objDate, setObjDate] = useState('');
    const [objMonth, setObjMonth] = useState('');
    
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);

      let tempDate = new Date(currentDate);
      let fdate = tempDate.getDate() + ' / ' + (tempDate.getMonth()+1) + ' / ' + tempDate.getFullYear();
      let datemonth = tempDate.getMonth();
      let dateday = tempDate.getDate();
      let ftime = tempDate.getHours() + ' : ' + tempDate.getMinutes();
      setDateMsg(fdate);
      setTimeMsg(ftime);
      console.log(tempDate);
      setObjDate(dateday);
      setObjMonth(datemonth);

    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };


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
        setImageUploadingPost(true)
        const reference = storage().ref(response.fileName)

        const task = reference.putFile(response.path)
        task.on('state_changed', (taskSnapshot) => {
            const percentage = (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 1000

            setUploadStatusPost(percentage)
        })

        task.then(async () => {
            const url = await reference.getDownloadURL()

            setImagePost(url)
            setImageUploadingPost(false)
        })
    }

    const addPost = async () => {

      if (!type.trim()) {
        Snackbar.show({
          text: 'Please select event type',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }

      if (!namepost.trim()) {
        Snackbar.show({
          text: 'Please enter event name',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!venuepost.trim()) {
        Snackbar.show({
          text: 'Please enter venue',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!dateMsg.trim()) {
        Snackbar.show({
          text: 'Please select date',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!descriptionpost.trim()) {
        Snackbar.show({
          text: 'Please provide event details',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!maxregistrations.trim()) {
        Snackbar.show({
          text: 'Please enter maximum number of registrations allowed',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!addresspost.trim()) {
        Snackbar.show({
          text: 'Please enter address',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!imagepost) {
        Snackbar.show({
          text: 'Please upload event poster card',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      if (!link.trim()) {
        Snackbar.show({
          text: 'Please provide event registration link',
          textColor: 'white',
          backgroundColor: "red"
      })
        return;
      }


      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); 
      var yyyy = today.getFullYear();
      
      today = dd + '/' + mm + '/' + yyyy;
          try {
              

              const uid = shortid.generate()

              await database().ref(`/posts/${uid}`).set({
                  name: namepost,
                  objDate,
                  objMonth,
                  type,
                  venue: venuepost,
                  address: addresspost,
                  description: descriptionpost,
                  maxregistrations,
                  link,
                  whatsapp,
                  facebook,
                  instagram,
                  twitter,
                  by: userState.name,
                  UploadDate: today,
                  userImage: userState.image,
                  picture: imagepost,
                  Date: dateMsg,
                  Time: timeMsg,
                  id: uid
              })
              console.log("Post Added SUCCESS")
              Snackbar.show({
                text: "Event added successfully",
                textColor: "white",
                backgroundColor: "green"
            })
              navigation.navigate('Home')

          } catch (error) {
              console.log(error)
              Snackbar.show({
                  text: "Post upload failed",
                  textColor: "white",
                  backgroundColor: "red"
              })
          }
    }

    return (
        <Container style={styles.container}>
          <Content padder>
         
            <ScrollView contentContainerStyle={{flexGrow: 1}}>

            <Text style={{fontSize: 20, color: '#6C63FF', textAlign: 'center', fontWeight: 'bold', marginVertical: 10, paddingBottom: 20,}}>Event details</Text>
            <Text style={{fontSize: 18, color: '#353238', marginLeft: 18, marginTop: 5, fontWeight: 'normal',}}>Select Event Type</Text>
              
             
              
              
              <Form>

              <Picker
              dropdownIconColor="#6C63FF"
  selectedValue={type}
  onValueChange={(itemValue, itemIndex) =>
    setType(itemValue)
  }>
  <Picker.Item style={{fontSize: 18}} label="Bug Bounty Program" value="Bug Bounty Program" color="#6C63FF" />
  <Picker.Item style={{fontSize: 18}} label="Community Meet" value="Community Meet" color="#6C63FF" />
  <Picker.Item style={{fontSize: 18}} label="Conference" value="Conference" color="#6C63FF" />
  <Picker.Item style={{fontSize: 18}} label="Hackathon" value="Hackathon" color="#6C63FF" />
  <Picker.Item style={{fontSize: 18}} label="Seminar" value="Seminar" color="#6C63FF" />
  <Picker.Item style={{fontSize: 18}} label="Webinar" value="Webinar" color="#6C63FF" />
  <Picker.Item style={{fontSize: 18}} label="Workshop" value="Workshop" color="#6C63FF" />

</Picker>
              <Item rounded style={styles.formItem} >
                  <Input
                  style={{paddingLeft: 20}}
                    placeholder="Event Name"
                    value={namepost}
                   
                    onChangeText={(text) => setNamePost(text)}
                  />
                </Item>

                <Item rounded style={styles.formItem} >
                  <Input
                    style={{paddingLeft: 20}}
                    placeholder="Venue"
                    value={venuepost}
                   
                    onChangeText={(text) => setVenuePost(text)}
                  />
                </Item>

                <Button
                title="Select date"
                
                buttonStyle={{
                  backgroundColor: '#6C63FF',
                  borderRadius: 5,
                }}
                titleStyle={{ fontWeight: '600', fontSize: 16 }}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 200,
                  marginVertical: 10,
                  marginLeft: 100,
                }}
                onPress={()=> showMode('date')}
              />

<Text style={styles.datetimemessage}>Date: {dateMsg}</Text>
<Button
                title="Select time"
                
                buttonStyle={{
                  backgroundColor: '#6C63FF',
                  borderRadius: 5,
                }}
                titleStyle={{ fontWeight: '600', fontSize: 16 }}
                containerStyle={{
                  marginHorizontal: 50,
                  height: 50,
                  width: 200,
                  marginVertical: 10,
                  marginLeft: 100,
                }}
                onPress={()=> showMode('time')}
              />

<Text style={styles.datetimemessage}>Time: {timeMsg}</Text>


               

{show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              // minimumDate={new Date(2022, 1, 18)}
              minimumDate={new Date()}
              is24Hour={true}
              display="default"
              onChange={onChange}
             
            />
          )}


                <Item regular style={{marginVertical: 20}}>
                  <Textarea style={{fontSize: 17, paddingLeft: 20}}
                    rowSpan={5}
                    placeholder="Add event description..."
                    value={descriptionpost}
                    onChangeText={(text) => setDescriptionPost(text)}
                  />
                </Item>

                <Item rounded style={styles.formItem} >
                  <Input
                  style={{paddingLeft: 20}}
                    placeholder="Max. no. of registrations"
                    value={maxregistrations}
                   
                    onChangeText={(text) => setMaxRegistrations(text)}
                  />
                </Item>

                <Item regular style={{marginBottom: 20}}>
                  <Textarea style={{fontSize: 17, paddingLeft: 20}}
                    rowSpan={3}
                    placeholder="Add detailed address..."
                    value={addresspost}
                    onChangeText={(text) => setAddressPost(text)}
                  />
                </Item>

                {imagepost && (
                <Image
                  source={{uri: imagepost}}
                  style={styles.image}
                  resizeMode="center"
                />
              )}
    
                {imageUploadingpost ? (
                  <ProgressBar progress={uploadStatuspost} color="#6C63FF" style={styles.progress} />
                ) : (
                  <Button
                  onPress={chooseImage}
                title="Upload image"
                icon={{
                  name: 'cloud-upload-outline',
                  type: 'ionicon',
                  size: 25,
                  color: '#6C63FF',
                  marginRight: 5,
                }}
                buttonStyle={{
                  borderWidth: 1,
                  borderColor: '#6C63FF',
                }}
                type="outline"
                titleStyle={{ color: '#6C63FF' }}
                containerStyle={{
                  width: 380,
                  marginBottom: 20,
                  marginLeft: 5,
                  marginVertical: 10,
                }}
              />
                )}       

                <Text style={styles.contactSupportHeading}>Registration link & Contact details:</Text>  

                <TextInput
    backgroundColor="#fff"
    label="Link for registration"
    left={<TextInput.Icon name="link" color="#6C63FF"  />}
    style={{ margin: 10, backgroundColor: '#fff'  }}
    activeUnderlineColor="#6C63FF" 
    underlineColor="#6C63FF"
    value={link}
    onChangeText={(text) => setLink(text)} 
  />

  <TextInput
    backgroundColor="#fff"
    label="Whatsapp"
    left={<TextInput.Icon name="whatsapp" color="#6C63FF" />}
    style={{ margin: 10, backgroundColor: '#fff' }}
    activeUnderlineColor="#6C63FF" 
    underlineColor="#6C63FF" 
    value={whatsapp}
    onChangeText={(text) => setWhatsapp(text)} 
  />

  <TextInput
    backgroundColor="#fff"
    label="Twitter"
    left={<TextInput.Icon name="twitter" color="#6C63FF" />}
    style={{ margin: 10, backgroundColor: '#fff' }}
    activeUnderlineColor="#6C63FF" 
    underlineColor="#6C63FF" 
    value={twitter}
    onChangeText={(text) => setTwitter(text)} 
  />

  <TextInput
    backgroundColor="#fff"
    label="Instagram"
    left={<TextInput.Icon name="instagram" color="#6C63FF" />}
    style={{ margin: 10, backgroundColor: '#fff' }}
    activeUnderlineColor="#6C63FF" 
    underlineColor="#6C63FF" 
    value={instagram}
    onChangeText={(text) => setInstagram(text)} 
  />

   <TextInput
    backgroundColor="#fff"
    label="Facebook"
    left={<TextInput.Icon name="facebook" color="#6C63FF" />}
    style={{ margin: 10, backgroundColor: '#fff' }}
    activeUnderlineColor="#6C63FF" 
    underlineColor="#6C63FF" 
    value={facebook}
    onChangeText={(text) => setFacebook(text)} 
  />

                                                                                                   
                
    
                
              
              <TouchableOpacity style={styles.buttonTouch} onPress={addPost}>
              
                <Text style={styles.buttonText}>Add event</Text>
              </TouchableOpacity>
              
              </Form>
            </ScrollView>
          </Content>
        </Container>
      );
    
}

const mapStateToProps = (state) => ({
    userState: state.auth.user,
})

AddPost.propTypes = {
    userState: propTypes.object.isRequired
}

export default connect(mapStateToProps)(AddPost)



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  formItem: {
    height: 50,
    marginBottom: 20,
  },
    icon: {fontSize: 25, color: '#6C63FF'},
    image: {width: null, height: 150, marginVertical: 15},
    progress: {width: null, marginBottom: 20},

    buttonView: {
      marginLeft: 1,
      marginBottom: 20,
      alignitems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      
    },

    buttonTouch: {
      borderRadius: 50,
      height: 45,
      width: 390,
      backgroundColor: '#6C63FF',
      marginTop: 60,
      marginBottom: 30,
    },

    imageButton: {
      borderRadius: 50,
      height: 45,
      width: 390,
      borderWidth: 1,
      borderColor: '#6C63FF'

    },

    imageButtonText: {
      color: '#6C63FF',
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      paddingTop: 8,
    },

    imageButtonView: {
      marginBottom: 20,
    },

    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 8,
    },

    datetimemessage: {
      fontSize: 17,
      fontWeight: '600',
      color: '#353238',
      textAlign: 'center',
    },

    contactSupportHeading: {
      textAlign: 'center',
      fontSize: 17,
      color: '#353238',
      fontWeight: '600',
      marginBottom: 20,
    }
  });
  