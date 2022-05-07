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


const Profile = ({userDetails}) => {
    // console.log(details)
    if(userDetails){
        var tmp = userDetails.skillsp;
        var parts = tmp.split(',');
    }

    
    return (
      <>
       <Text style={{textAlign:'center', fontWeight: 'bold', marginTop: 35, fontSize: 20, marginBottom:15, paddingBottom: 0, color: '#6C63FF'}}>My Profile</Text>
        <Card style={styles.card}>
          <CardItem cardBody style={styles.cardItem}>
            <Image
              source={{
                uri: userDetails.picture,
                width: 150,
                height: 250,
              }}
              style={styles.image}
            />
          </CardItem>
          
            <Text style={styles.nameHeader}>
              {userDetails.namep} 
            </Text>
            
          

         
          <Text style={styles.caption}>{userDetails.descriptionp}</Text>
         

          
          <CardItem bordered style={styles.cardItem}>
              <View style={{flexDirection: 'row'}}>
            <Icon name='phone' size={14} color='#6C63FF' style={{paddingTop: 4, paddingRight: 3}}/>
              <Text style={styles.text}>{userDetails.mobilep}</Text>

              </View>
            
          </CardItem>
          <CardItem bordered style={styles.cardItem}>
              <View style={{flexDirection: 'row'}}>
            <Icon name='email' size={14} color='#6C63FF' style={{paddingTop: 4, paddingRight: 3}}/>
              <Text style={styles.text}>{userDetails.emailp}</Text>

              </View>
            
          </CardItem>
         
          <CardItem bordered style={styles.cardItem}>
          <View style={{flexDirection :'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
              <Text style={{color:'#6C63FF', textAlign: 'center', fontWeight: '500', marginTop: 20, marginBottom: 5}}>Skills</Text>
              <View style={{flexDirection: 'row', width: 300,  flexWrap:'wrap', alignItems: 'center', justifyContent: 'center'}}>
             
          { parts.map((item, key, one)=>(
              <>
              <Icon key={one} name='circle' size={8}s color='#6C63FF' />
         <Text key={key} style={{marginRight: 15}} > { item } </Text>
         </>)
         )}
          

              </View>
          
              
              </View>
            
          </CardItem>
          
        </Card>
        </>
      );
}

const mapStateToProps = (state) => ({
    userDetails: state.auth.user,
  });
  

  Profile.propTypes = {
    userDetails: propTypes.object,
  };
  
  export default connect(mapStateToProps, null)(Profile);


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
  