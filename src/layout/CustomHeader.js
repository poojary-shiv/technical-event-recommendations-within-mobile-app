import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, Image} from 'react-native'
import {
    Header,
    Body,
    Right,
    Left,
    Button,
    Icon,
    Title,
    Text
} from 'native-base'

import { connect} from 'react-redux'
import propTypes from 'prop-types'
import {signOut} from '../action/auth'


const CustomHeader = ({signOut, authState, navigation, userDetails}) => {
    // console.log(userDetails.uid)
    // console.log(userDetails.type)
    const toggleDrawer = () => {
        //Props to open/close the drawer
        navigation.toggleDrawer();
      };
    
    var dataObject = {fname: 'anyvalue'}
    var tempValue='user';
    if(userDetails){
        
        dataObject = Object.assign({}, userDetails);
        tempValue=dataObject.type;
    }
    console.log(tempValue)
  
    return(
        <Header
        androidStatusBarColor="#6C63FF"
        style={{
            backgroundColor: "#6C63FF"
        }}
        >
            {authState.isAuthenticated && 
            <Left>
            <TouchableOpacity onPress={toggleDrawer}>
            {/*Donute Button Image */}
            <Image
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
              }}
              style={{width: 30, height: 30, marginLeft: 5, marginTop: 5}}
            />
          </TouchableOpacity>
    
            </Left>}
             
        { !authState.isAuthenticated && <Body>
            <Title>TechEvents</Title>
        </Body>}
       
        <Right>
            {
            
            authState.isAuthenticated && tempValue =='organizer' && (
                <Button
                transparent
                iconLeft
                onPress={() => navigation.navigate('AddPost')}
                >
                <Text style={{color: '#fff', fontSize: 15,  fontWeight: '900', paddingTop: 5,}}>+ Add Event</Text>
                </Button>
            ) }
            {/* {authState.isAuthenticated && (
                <>
                
                <Button
                transparent
                onPress={() => signOut()}
                >
                    <Icon name="log-out-outline" style={{color: "red", fontSize: 30}} />
                </Button>
                </>
            )} */}
        </Right>
        </Header>
    )
}

const mapStateToProps = (state) => ({
    authState: state.auth,
    userDetails: state.auth.user
})

const mapDispatchToProps = {
    signOut
}

CustomHeader.prototypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired,
    userDetails: propTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps )(CustomHeader)