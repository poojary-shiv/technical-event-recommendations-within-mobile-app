import React, {useState, useEffect} from 'react'
import {StyleSheet, ScrollView, TouchableOpacity, View, Image, Text, Linking, Platform} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontiso from 'react-native-vector-icons/Fontisto';
import { Button, CheckBox} from 'react-native-elements'
import database from '@react-native-firebase/database' 

var flag=0;


import {
    Container,
    Form,
    Item,
    Input,

    Thumbnail,
    Content,
    TextArea,
} from 'native-base'
import Snackbar from 'react-native-snackbar'
import storage from '@react-native-firebase/storage'


import {options} from '../utils/options'

//redux
import propTypes from 'prop-types'

import {connect} from 'react-redux'



const Detail = ({route}) => {
 


const [idarray, setIdarray] = useState([]);
var Bmsg;


 
  



    const { itemId, type, name, venue, address, description, link, whatsapp, facebook, twitter, 
        instagram, by, Date, Time, poster, usertype, registeredEvents, bookmarkedEvents, userid } = route.params;
        // console.log(usertype)
        // console.log('date obtained is ');
        // console.log(poster)
        var initValue;
        var initValueBookmark;


        
        var bool = false;
        var boolbookmark = false;
        console.log('bool initialized first time')
        // console.log(initValue)
        if(registeredEvents){
          initValue=registeredEvents.slice();
        }

        if(bookmarkedEvents){
          initValueBookmark=bookmarkedEvents.slice();
        }
       
        
        if(initValue){
          console.log('gone for searching');
          const ind = initValue.indexOf(itemId);
          console.log('on searching this is found '+ind);
          if (ind > -1) {
            console.log('VALUE FOUND');
            bool = true;
          }

        }

        if(initValueBookmark){
         
          const ind = initValueBookmark.indexOf(itemId);
         
          if (ind > -1) {
            
            boolbookmark = true;
          }

        }

        

        


        console.log('before setting bool '+ bool);
        const [check1, setCheck1] = useState(bool);
        const [bookmark, setBookmark] = useState(boolbookmark);
        console.log('check bool at init '+ check1);

        if(bookmark){
          Bmsg = 'Remove bookmark'
          
      }
      else{
          Bmsg = 'Bookmark this event'
          
      }



        const dialCall = () => {
          // console.log('here is the mobile number');
          // console.log(whatsapp);

        let phoneNumber = '';

        if (Platform.OS === 'android') {
          phoneNumber ='tel:'+ whatsapp;
        }
        else {
          phoneNumber = 'telprompt:${whatsapp}';
        }
      
        Linking.openURL(phoneNumber);
      };

      const modifyEventlist = async () => {
        
        try {
          const tempstore = userid;
          await database().ref(`/users/${tempstore}`).update({
            registeredEvents: filtered,
          })
          console.log("Event modification done " + filtered)
      } catch (error) {
        console.log('something fishy')
          console.log(error)
      }
      }

      const modifyEventlistBookmark = async () => {
        
        try {
          const tempstore = userid;
          await database().ref(`/users/${tempstore}`).update({
            bookmarkedEvents: filteredBookmark,
          })
          console.log("Event modification done " + filteredBookmark)
      } catch (error) {
        console.log('something fishy')
          console.log(error)
      }
      }


      var filtered=[];
      var filteredBookmark=[];

      if(registeredEvents){
        filtered=registeredEvents.slice();
      }

      if(bookmarkedEvents){
        filteredBookmark=bookmarkedEvents.slice();
      }

      if(check1){
          
        if(filtered){
            filtered.push(itemId);
            }
            modifyEventlist();
}
      else{
        bool=false;
      
        if(filtered){
          Array.prototype.remove = function(value) {
            for (var i = this.length; i--; )
            {
                if (this[i] === value) {
                    this.splice(i, 1);
                }
            }
        }
        filtered.remove(itemId);
      }
      modifyEventlist();
    }
      

      if(bookmark){
          
        if(filteredBookmark){
            filteredBookmark.push(itemId);
            }
            modifyEventlistBookmark();
}
      else{
        boolbookmark=false;
      
        if(filteredBookmark){
          Array.prototype.remove = function(value) {
            for (var i = this.length; i--; )
            {
                if (this[i] === value) {
                    this.splice(i, 1);
                }
            }
        }
        filteredBookmark.remove(itemId);
      }
      modifyEventlistBookmark();
    }

    



      

    return (
        <Container style={styles.container}>
          <Content padder>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{ flex: 1}}>
      {/* <Text>Details Screen</Text> */}
      {/* <Text>itemId: {JSON.stringify(itemId)}</Text> */}
      <Text style={styles.typeHeading}>{type}</Text>
      <Image
                  source={{uri: poster}}
                  style={styles.image}
                  resizeMode="center"
                />
        <View style={{flexDirection: 'row', paddingBottom: 15}}>
            <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Event name:</Text>
        <Text style={styles.value}>{name}</Text>
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Venue:</Text>
        <Text style={styles.value}>{venue}</Text>
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Date:</Text>
        <Text style={styles.value}>{Date}</Text>
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Time:</Text>
        <Text style={styles.value}>{Time}</Text>
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Organized by:</Text>
        <Text style={styles.value}>{by}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Event details:</Text>
        
        </View>

        <View style={{flexDirection: 'column', paddingBottom: 15, paddingLeft: 17}}>
        
        <Text style={styles.value}>{description}</Text>
        </View>
        
        <View style={{flexDirection: 'row'}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Event location:</Text>
        
        </View>

        <View style={{flexDirection: 'column', paddingBottom: 15, paddingLeft: 17}}>
        
        <Text style={styles.value}>{address}</Text>
        </View>
        
        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Fontiso name="pinboard" size={15} style={{paddingTop: 7, color: '#353238', paddingLeft: 5}}/>
        <Text style={styles.key}>Social media links:</Text>
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Icon name='whatsapp' size={24} style={{paddingLeft: 10, color: '#6C63FF'}} />
        <TouchableOpacity onPress={dialCall}>
        <Text style={styles.value}>{whatsapp}</Text>

        </TouchableOpacity>
       
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Icon name='facebook' size={24} style={{paddingLeft: 10, color: '#6C63FF'}} />
        <TouchableOpacity onPress={() => Linking.openURL('https://'+ facebook)}>
        <Text style={styles.value}>{facebook}</Text>

        </TouchableOpacity>
        
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 15}}>
        <Icon name='twitter' size={24} style={{paddingLeft: 10, color: '#6C63FF'}} />
        <TouchableOpacity onPress={() => Linking.openURL('https://'+twitter)}>
        <Text style={styles.value}>{twitter}</Text>

        </TouchableOpacity>
       
        </View>

        <View style={{flexDirection: 'row', paddingBottom: 40}}>
        <Icon name='instagram' size={24} style={{paddingLeft: 10, color: '#6C63FF'}} />
        <TouchableOpacity onPress={() => Linking.openURL('https://'+instagram)}>
        <Text style={styles.value}>{instagram}</Text>

        </TouchableOpacity>
        
        </View>
        {
          usertype==='participant' &&
          <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouch} onPress={() => Linking.openURL(link)}>
                <Text style={styles.buttonText}>Register for the Event</Text>
              </TouchableOpacity>
        </View>
        }

{
          usertype==='participant' &&
          <View style={styles.buttonView}>
              <TouchableOpacity style={styles.buttonTouchSecond} onPress={() => {setBookmark(!bookmark) 
              if(bookmark){
                Snackbar.show({
                  text: "Event removed from bookmarked events",
                  textColor: 'white',
                  backgroundColor:'#FFB81C'
              })

              }
              else{
                Snackbar.show({
                  text: "Event added to bookmarked events",
                  textColor: 'white',
                  backgroundColor:'#FFB81C'
              })

              }}}>
                <Text style={styles.buttonTextSecond}>{Bmsg}</Text>
              </TouchableOpacity>
        </View>
        }

{
          usertype==='participant' &&
          <View style={{marginBottom: 30}}>
          <CheckBox
                    size={35}
                    checkedColor="#6C63FF"
                    title="Add event to my registered events"
                    checkedTitle="Event added to registered events"
                    uncheckedColor="#6C63FF"
                    checked={check1}
                    onPress={() => {setCheck1(!check1)
                    
                      
                        Snackbar.show({
                          text: "Changes saved",
                          textColor: "white",
                          backgroundColor: "green"
                      })
            
                      
                    }}
                    
                    backgroundColor='#fff'
                    containerStyle={{ backgroundColor: '#fff', width: "94%", borderWidth: 1, borderColor: '#fff' }}
                    style={{backgroundColor: '#fff'}}
                  />
          </View>
        }

        

        

        

        


     
      
      

      
      
      
     
        
     
     </View>
              
               
              
            </ScrollView>
          </Content>
        </Container>
      );
    
}


  


export default Detail



const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flex: 1,
      justifyContent: 'flex-start',
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

    buttonTouchSecond: {
        borderWidth: 1,
        borderRadius: 50,
        height: 45,
        width: 390,
        borderColor: '#6C63FF',
        
      },

    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingTop: 8,
    },

    buttonTextSecond: {
        color: '#6C63FF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 8,
      },
    image: {width: null, height: 150, marginVertical: 15, marginBottom: 30},

    typeHeading: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#353238',
        textTransform: 'uppercase',
        paddingTop: 10,

    },
    key: {
        paddingLeft: 8,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#353238'
    },
    value: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 'normal',
        color: '#353238'
    },

   
  });



