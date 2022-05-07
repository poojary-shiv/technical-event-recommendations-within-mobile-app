import React from 'react';
import {View, Text, StyleSheet, Image, LogBox} from 'react-native'
LogBox.ignoreLogs(["Each child in a list should have a unique \"key\" prop."]);
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    H1
} from 'native-base'
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Account = ({userDetails}) => {
    // console.log(details)
    
    
    return (
      <>
       <Text style={{textAlign:'center', fontWeight: 'bold', marginTop: 35, fontSize: 20, marginBottom:15, paddingBottom: 0, color: '#6C63FF'}}>Account Details</Text>
        <Card style={styles.card}>
          <CardItem cardBody style={styles.cardItem}>
            <Image
              source={{
                uri: userDetails.image,
                width: 150,
                height: 250,
              }}
              style={styles.image}
            />
          </CardItem>
          
            <Text style={styles.nameHeader}>
              {userDetails.name} 
            </Text>
            
          

         
          <Text style={styles.caption}>{userDetails.description}</Text>
         

          

          <CardItem bordered style={styles.cardItem}>
              <View style={{flexDirection: 'row'}}>
            <Icon name='email' size={14} color='#6C63FF' style={{paddingTop: 4, paddingRight: 3}}/>
              <Text style={styles.text}>{userDetails.email}</Text>

              </View>
            
          </CardItem>


          <CardItem bordered style={styles.cardItem}>
              <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Ionicons name='location' size={20} color='#6C63FF' style={{paddingTop: 4, paddingRight: 3, marginBottom: 3}}/>
              <Text style={{ color: '#353238', textAlign: 'center'}}>{userDetails.address}</Text>

              </View>
            
          </CardItem>
         
         
        </Card>
        </>
      );
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.user,
  });
  

  Account.propTypes = {
    userDetails: propTypes.object,
  };
  
  export default connect(mapStateToProps, null)(Account);


const styles = StyleSheet.create({
    card: {
      width: '90%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
     
      borderWidth: 3,
      borderColor: '#6C63FF',
      marginTop: 80,
      marginLeft: 22,
      paddingBottom: 20
    },
    cardItem: {
      backgroundColor: '#fff',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 150 / 2,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#353238',
      marginTop: -50,
    },
    text: {
      color: '#353238',
    },

    nameHeader: {
        fontSize: 24,
        fontWeight: '400',
        color:'#353238',
        marginTop: 5,
        
    },

    caption: {
        color: '#353238',
        marginBottom: 40,
    }
  });
  