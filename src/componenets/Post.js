import React, {useState, useEffect} from 'react';
import {Image, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import database from '@react-native-firebase/database';
import Detail from '../screens/Detail'
import { useNavigation } from '@react-navigation/native';



const Post = ({item, userDetails, sourceType}) => {
  const navigation = useNavigation();
 
  var userType;
  
  if(userDetails)
  {
    if(userDetails.type){
    
      userType=userDetails.type;
    }
  }

  if(sourceType){
    var src;
    if(sourceType=='1'){
      src='Detail'
    }
    else if(sourceType=='2'){
      src='Detailevents'
    }
    else if(sourceType=='3')
    { 
      src='Detailbookmarks'
    }
    else{
      src='DetailSearch'
    }
    console.log('******************  '+ sourceType + '****************');
    console.log(src);
  }

  




    const month = ["Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."];
    //const formatDate = item.Dateobj.getMonth();
    //const eventDate = month[formatDate];
    const [shortMonth, setShortMonth] = useState('')
    const c = item.objMonth;
    const n = month[c];
    //setShortMonth(month[c]);

    const [upvote, setUpvote] = useState(0)
    const [downvote, setDownvote] = useState(0)

    useEffect(() => {
      console.log(item)

      if (item.vote) {
        let upVote = 0
        let downVote = 0

        Object.values(item.vote).map((val) => {
          if (val.upvote) {
            upVote += 1
          }

          if (val.downvote) {
            downVote += 1
          }
        })

        setUpvote(upVote)
        setDownvote(downVote)
      }


    }, [item])

    const upVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          upvote: 1
        })
        .then(() => console.log('UPVOTED'))
    }

    const downVotePost = () => {
      database()
        .ref(`/posts/${item.id}/vote/${userDetails.uid}`)
        .set({
          downvote: 1
        })
        .then(() => console.log('DOWNVOTED'))
    }

    

    return (
      <>
      
      
      <Card
        style={{
          borderRadius: 8,
          // alignContent: 'center',
          // alignItems: 'center',
          width: 320,
          backgroundColor: '#f6f6f6',
          borderColor: '#6C63FF',
          marginLeft: 45,
          //marginTop: 50,
          marginBottom: 50,
        }}>
           
            <CardItem style={styles.cardHeaderContainer}>
              <Text style={{color: '#353238', paddingVertical: 10, textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold', fontSize: 19, }}># {item.type}</Text>
            </CardItem>
        <TouchableOpacity onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate(`${src}`, {
            itemId: item.id,
            type: item.type,
            name: item.name,
            venue: item.venue,
            address: item.address,
            description: item.description,
            link: item.link,
            whatsapp: item.whatsapp,
            facebook: item.facebook,
            twitter: item.twitter,
            instagram: item.instagram,
            by: item.by,
            Date: item.Date,
            Time: item.Time,
            poster: item.picture,
            usertype: userType,
            registeredEvents: userDetails.registeredEvents,
            bookmarkedEvents: userDetails.bookmarkedEvents,
            userid: userDetails.uid,

      
          });
        }}> 
        <CardItem cardBody>
          {console.log('origianl image is here')}
          {console.log(item.picture) }
          <Image
            source={{uri: item.picture}}
            style={{height: 200, width: null, flex: 1}}
          />
        </CardItem>
        </TouchableOpacity>

        <CardItem
          cardBody
          style={{
            backgroundColor: '#f6f6f6',
            textAlign: 'left',
          }}>
          <Text
            //numberOfLines={2}
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              color: '#353238',
              textAlign: 'left',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,

          
              
            }}>
            {item.objDate} {n} | {item.venue}
          </Text>
        </CardItem>

        <CardItem
          cardBody
          style={{
            backgroundColor: '#f6f6f6',
          }}>
          <Text
            //numberOfLines={2}
            style={{
              fontSize: 13,
              fontWeight: '300',
              color: '#6C63FF',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 12,
            }}>
            Organized by {item.by}.
          </Text>
        </CardItem>

        <CardItem
          cardBody
          style={{
            backgroundColor: '#f6f6f6',
          }}>
          <Text
            //numberOfLines={2}
            style={{
              fontSize: 14,
              color: '#353238',
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 10,
              lineHeight: 20,
            }}>
            {item.description}
          </Text>
        </CardItem>

       
        <CardItem
          style={{
            backgroundColor: '#6C63FF',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}>
          <Left>
            <Button transparent onPress={upVotePost}>
              <Icon
                name="thumbs-up"
                type="Entypo"
                style={{fontSize: 20, color: '#fff'}}
              />
              <Text
                style={{
                  color: '#fff',
                }}>
                {upvote}
              </Text>
            </Button>
            <Button transparent onPress={downVotePost}>
              <Icon
                name="thumbs-down"
                type="Entypo"
                style={{fontSize: 20, color: '#fff'}}
              />
              <Text
                style={{
                  color: '#fff',
                }}>
                 {downvote}
              </Text>
            </Button>
          </Left>
         
        </CardItem>
      </Card>
      </>
  
    );
  
}

export default Post

const styles = StyleSheet.create({
  cardHeaderContainer: {
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',

  },
  
  });
  