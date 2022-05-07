import React, {useState,useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import {Container, H1, Text} from 'native-base';
// redux
import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// to render empty container

import Noevents from '../assets/undraw_Faq_re_31cw.png'
import EmptyContainer from '../componenets/EmptyContainer';
import Post from '../componenets/Post';

import SearchScreen from './SearchScreen'
import BookmarkScreen from './BookmarkScreen'


const searchName = "Search";
const bookmarkName = "Bookmarks";
const homeName = "Home";
const Tab = createBottomTabNavigator();

const Home = ({getPosts, postState, userDetails}) => {
  

  // getting post on component mount
  var myArray = postState.posts;
  
  useEffect(() => {
      console.log("HOME COMP", postState.posts)
    getPosts();
  }, []);

  var typeObject = {fname: 'anyvalue'}
  var typeValue='user';

  var nameObject = {fname: 'anyvalue'}
  var nameValue='ourname';
  var headerMsg='msg';

  var pref = []

  if(userDetails){
    typeObject = Object.assign({}, userDetails);
    typeValue= typeObject.type;

    if(typeValue=='organizer'){
      headerMsg='Uploaded Events'
      nameObject = Object.assign({}, userDetails);
      nameValue= nameObject.name;
      if(myArray){
        myArray = myArray.filter(function( obj ) {
          return obj.by === nameValue;
      });

      }
     

    }
    else{
      var n=[];
      headerMsg='Upcoming Events'
      console.log('participant section')
      nameObject = Object.assign({}, userDetails);
      pref= nameObject.listPreferences;
      console.log(pref)
      console.log('here id data');
      console.log(myArray);

      for (var i = 0; i < pref.length; i++) { 
        
        if(myArray){
          for (var j = 0; j < myArray.length; j++) {
            if (myArray[j].type === pref[i]) {
              n.push(myArray[j]);
            }
        }
      }
}

myArray=[];

myArray.push(...n);
      
      // myArray.splice(0, myArray.length);
      // myArray.push(n); 
      // console.log('after editing')
      // console.log(myArray)
      

      
  }

  if(myArray){
    if(myArray.length==0){
      headerMsg='';
  }

  }

 



}
  
    
  

  // if post is fetching from DB then rendering empty component
  if (postState.loading) {
    return <EmptyContainer />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign:'center', fontWeight: 'bold', marginTop: 15, fontSize: 20, marginBottom:15, paddingBottom: 0, color: '#6C63FF'}}>{headerMsg}</Text>
      
      
      <FlatList
        showsVerticalScrollIndicator ={false}
        data={myArray}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (

           <Post item={item} userDetails={userDetails} sourceType='1' key={item.id} />           
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1 style={styles.emptyListMsg}>No events posted</H1>
            <Image style={styles.imageContainer}
            source={Noevents}
            />
          </Container>
        )}
      />
     
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  postState: state.post,
  userDetails: state.auth.user,
});

const mapDispatchToProps = {
  getPosts,
};

Home.propTypes = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    padding: 4,
    flex: 1,
  },
  emptyContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    height: 250,
    width: 250,
  },

  emptyListMsg: {
    fontSize: 20,
    fontWeight: '600',
    color: '#353238'
  },
});
