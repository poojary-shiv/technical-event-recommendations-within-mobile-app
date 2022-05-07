import React, {useState,useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import {Container, H1, Text, View} from 'native-base';
// redux
import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';


// to render empty container

import Noevents from '../assets/undraw_Faq_re_31cw.png'
import EmptyContainer from '../componenets/EmptyContainer';
import Post from '../componenets/Post';




const MyEventsScreen = ({getPosts, postState, userDetails}) => {
  

  // getting post on component mount
  var myArray = postState.posts;
  
  useEffect(() => {
      console.log("HOME COMP", postState.posts)
    getPosts();
  }, []);

  var myEventsObject = {fname: 'anyvalue'}
  var myEventsValue='user';



  if(userDetails){
    myEventsObject = Object.assign({}, userDetails);
    myEventsValue = myEventsObject.registeredEvents;

    uniq = [...new Set(myEventsValue)];

   
    
      var n=[];
     
    

      for (var i = 0; i < uniq.length; i++) { 
        
        if(myArray){
          for (var j = 0; j < myArray.length; j++) {
            if (myArray[j].id === uniq[i]) {
              n.push(myArray[j]);
            }
        }
      }
}

var msg;
if(n.length==0){
    msg='';
}
else{
    msg='My Events'
}

  }



  // if post is fetching from DB then rendering empty component
  if (postState.loading) {
    return <EmptyContainer />;
  }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={{textAlign:'center', fontWeight: 'bold', marginTop: 15, fontSize: 20, marginBottom:15, paddingBottom: 0, color: '#6C63FF'}}>{msg}</Text>
    
      
      <FlatList
        showsVerticalScrollIndicator ={false}
        data={n}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (
            <>
            {/* <View style={{height: 30, color: '#fff'}}></View> */}
             <Post item={item} userDetails={userDetails} sourceType='2' key={item.id} />     
            </>
            

                
        )}
        ListEmptyComponent={() => (
          <Container style={styles.emptyContainer}>
            <H1 style={styles.emptyListMsg}>No registered events to show</H1>
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

MyEventsScreen.propTypes = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEventsScreen);

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
