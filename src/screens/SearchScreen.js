// SearchBar.js
import React, { useState, useEffect } from 'react';
// import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
import { View, StyleSheet, ScrollView, FlatList, SafeAreaView, Text, Image} from 'react-native';

import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import Noevents from '../assets/undraw_Faq_re_31cw.png'
import Snackbar from 'react-native-snackbar'

import EmptyContainer from '../componenets/EmptyContainer';
import Post from '../componenets/Post';

import {
    Container,
    Form,
    Item,
    Input,
    H1,

    Thumbnail,
    Content,
    TextArea,
} from 'native-base'

const SearchScreen = ({getPosts, postState, userDetails}) => {
  var flag=0;

    
    const [searchPhrase, setSearchPhrase] = React.useState('');
    const onChangeSearch = query => setSearchPhrase(query);
    const [isData, setIsdata] = useState(true);





const renderItem = ({item}) => {
  console.log(searchPhrase);
  // when no input, show all
  // console.log(userDetails)

  if (searchPhrase === "") {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} /> ;
  }
  // filter of the name
  if (item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
  if (item.venue.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
  if (item.by.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
  if (item.description.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
  if (item.address.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
  if (item.Date.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
  if (item.type.toUpperCase().includes(searchPhrase.toUpperCase().trim())) {
    return <Post item={item} userDetails={userDetails} sourceType='4' key={item.id} />;  
  }
 
 
};

 
  



useEffect(() => {
    console.log("HOME COMP", postState.posts)
  getPosts();
}, []);



if (postState.loading) {
    return <EmptyContainer />;
  }

  return (
   <>
  

  <SafeAreaView style={styles.container}>


  <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchPhrase}
      style={{borderWidth: 1, borderColor: '#353238', width: 390, marginTop: 12, marginLeft: 5, marginBottom:25,
     borderRadius: 25
    }}
    />
     
      <FlatList
 
        showsVerticalScrollIndicator ={false}
        data={postState.posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        
  
      />
    

      
     
</SafeAreaView>
</>
           
  );
};


const mapStateToProps = (state) => ({
    postState: state.post,
    userDetails: state.auth.user,
  });
  
  const mapDispatchToProps = {
    getPosts,
  };
  
  SearchScreen.propTypes = {
    getPosts: propTypes.func.isRequired,
    postState: propTypes.object.isRequired,
    userDetails: propTypes.object,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

// styles
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
    view: {
      margin: 10,
    },
    });