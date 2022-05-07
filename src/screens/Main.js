import React, {useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView, Image} from 'react-native';
import {Container, H1, Text} from 'native-base';
// redux
import {getPosts} from '../action/post';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// to render empty container
import EmptyContainer from '../componenets/EmptyContainer';


import Post from '../componenets/Post';

const Home = ({getPosts, postState, userDetails}) => {
  // getting post on component mount
  
  useEffect(() => {
      console.log("HOME COMP", postState.posts)
    getPosts();
  }, []);

  // if post is fetching from DB then rendering empty component
  if (postState.loading) {
    return <EmptyContainer />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{textAlign:'center', fontWeight: 'bold', marginTop: 15, fontSize: 20, marginBottom:15, paddingBottom: 0, color: '#6C63FF'}}>Upcoming Events</Text>
      <FlatList
        data={postState.posts}
        keyExtractor={(item) => item.id}
        renderItem={({item, index, separators}) => (

           <Post item={item} userDetails={userDetails} key={item.id} />           
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
    flex: 1,
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
