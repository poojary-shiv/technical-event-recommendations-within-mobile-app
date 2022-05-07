import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import {signOut} from '../action/auth'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import SignIn from './SignIn'

import { connect} from 'react-redux'
import propTypes from 'prop-types'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const DrawerContent = ({signOut, props, navigation, authState, userDetails}) => {

    const paperTheme = useTheme();
    if(userDetails){

        var type = userDetails.type;
        if(type==='organizer'){
            var img= userDetails.image;
            var desc=userDetails.description;
            var name=userDetails.name;

        }
        else{
            var desc = userDetails.descriptionp;
            var img = userDetails.picture;
            var name= userDetails.namep;


        }
        
       
        
    }

  

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15, marginRight: 5}}>
                            <Avatar.Image 
                                source={{
                    
                                   uri: img
                                }}
                                size={70}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{name}</Title>
                                <Caption style={styles.caption}>{desc}</Caption>
                            </View>
                        </View>

                        
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {navigation.navigate('Home')}}
                        />
                        {type==='organizer' &&
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Account details"
                            onPress={() => {navigation.navigate('AccountStackScreen')}}
                        />}

                       {type==='participant' &&

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => {navigation.navigate('ProfileStackScreen')}}
                        />}
                        {type==='participant' &&


<DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="clipboard-list-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Events"
                            onPress={() => {navigation.navigate('MyEventsStackScreen')}}
                        />}
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="square-edit-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Reset Password"
                            onPress={() => {navigation.navigate('ResetPasswordStackScreen')}}
                        />

                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="information-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="About Us"
                            onPress={() => {navigation.navigate('AboutStackScreen')}}
                        />
                        
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="phone-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {navigation.navigate('SupportStackScreen')}}
                        />
                        
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {
                        navigation.closeDrawer();
                       
                        signOut()
                        
                    }}
                />
            </Drawer.Section>
           
        </View>
    );
}

const mapStateToProps = (state) => ({
    authState: state.auth,
    userDetails: state.auth.user
})

const mapDispatchToProps = {
    signOut
}

DrawerContent.prototypes = {
    signOut: propTypes.func.isRequired,
    authState: propTypes.object.isRequired,
    userDetails: propTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps )(DrawerContent)

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 7,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: '600',
      marginRight: 5,
     
    },
    caption: {
      fontSize: 12,
      lineHeight: 12,
      paddingTop: 0,
      marginTop: 0,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      marginRight: 5,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });