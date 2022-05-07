import React, {useState,useEffect} from 'react'
import { Icon } from 'react-native-elements'
import { LogBox} from "react-native";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import {Text} from 'react-native'
import 'react-native-gesture-handler'
import propTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import auth from '@react-native-firebase/auth'

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';

import {useDispatch, connect} from 'react-redux'


import Participant from './screens/Participant'
import AddPost from './screens/AddPost'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Main from './screens/Main'
import SearchScreen from './screens/SearchScreen'
import BookmarkScreen from './screens/BookmarkScreen'
import About from './screens/About'
import Profile from './screens/Profile'
import Myevents from './screens/Myevents'
import Resetpassword from './screens/Resetpassword'
import DrawerContent from './screens/DrawerContent'
import Support from './screens/Support'
import Account from './screens/Account'
import Detail from './screens/Detail'


import Home from './screens/Home'
import CustomHeader from './layout/CustomHeader'

import {SET_USER, IS_AUTHTHENTICATED} from './action/action.types'

import database from '@react-native-firebase/database'
import EmptyContainer from './componenets/EmptyContainer'
import {requestPermission} from './utils/AskPermission'
import { createIconSetFromFontello } from 'react-native-vector-icons';




const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const BottomTabStack = createStackNavigator();
const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const BookmarkStack = createStackNavigator();
const AboutStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const MyEventsStack = createStackNavigator();
const ResetPasswordStack = createStackNavigator();
const SupportStack = createStackNavigator();
const AccountStack = createStackNavigator();



function BottomTabsRoot() {
  return (
    <BottomTabStack.Navigator screenOptions={{headerShown: false}} >
      <BottomTabStack.Screen name="BottomTabs" component={BottomTabs} />
     
    </BottomTabStack.Navigator>
  );
}

function getTabBarVisible(route) {
  const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = ['AddPost','Detail','Detailevents','Detailbookmarks','DetailSearch'];
    if(hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
  // const routeName = route.state
  //   ?  route.state.routes[route.state.index].name
  //   : route.params?.screen || 'Home';

  // if (routeName === 'Details') {
  //   return false;
  // }
  // return true;
}

function BottomTabs() {
 
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let colr = 'red';
            let si = 20;
            let rn = route.name;
            // console.log(route);

            if (route.name === "Home") {
              iconName = focused ? 'home' : 'home-outline';
              console.log('home found')

            } else if (rn === "Search") {
              iconName = focused ? 'search' : 'search-outline';

            } else if (rn === "Bookmark") {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            }

            // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} style={{paddingBottom: 0, marginBottom: 0}}/>;
          },
        }
        
          
      )}
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#fff',
        
          labelStyle: { paddingBottom: 10, fontSize: 10, marginTop: 0, paddingTop: 0 },
          style: {  height: 75, backgroundColor: '#6C63FF', borderTopRightRadius: 20, borderTopLeftRadius: 20,}
        }}>

        
        <Tab.Screen name="Home" component = {HomeStackScreen}  options={({ route }) => ({
    tabBarVisible: getTabBarVisible(route) })}/>
        <Tab.Screen name="Search" component={SearchStackScreen} options={({ route }) => ({
    tabBarVisible: getTabBarVisible(route) })}/>
        <Tab.Screen name="Bookmark" component={BookmarkStackScreen} options={({ route }) => ({
    tabBarVisible: getTabBarVisible(route) })}/>
       

      </Tab.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AddPost" component={AddPost} options={{tabBarStyle:{display:'none'}}} />
      <HomeStack.Screen name="Detail" component={Detail}  />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen name="DetailSearch" component={Detail} />
    </SearchStack.Navigator>
  );
}

function BookmarkStackScreen() {
  return (
    <BookmarkStack.Navigator screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <BookmarkStack.Screen name="Bookmark" component={BookmarkScreen} />
      <BookmarkStack.Screen name="Detailbookmarks" component={Detail}  />
    </BookmarkStack.Navigator>
  );
}

function AboutStackScreen() {
  return (
    <AboutStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <AboutStack.Screen name="About" component={About} />
      
    </AboutStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      
    </ProfileStack.Navigator>
  );
}

function AccountStackScreen() {
  return (
    <AccountStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <AccountStack.Screen name="Account" component={Account} />
      
    </AccountStack.Navigator>
  );
}
function MyEventsStackScreen() {
  return (
    <MyEventsStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <MyEventsStack.Screen name="Myevents" component={Myevents} />
      <MyEventsStack.Screen name="Detailevents" component={Detail}  />
      
    </MyEventsStack.Navigator>
  );
}

function ResetPasswordStackScreen() {
  return (
    <ResetPasswordStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <ResetPasswordStack.Screen name="Resetpassword" component={Resetpassword} />
      
    </ResetPasswordStack.Navigator>
  );
}

function SupportStackScreen() {
  return (
    <SupportStack.Navigator  screenOptions={{
      header: (props) => <CustomHeader {...props} />,
    }}>
      <SupportStack.Screen name="Support" component={Support} />
      
    </SupportStack.Navigator>
  );
}

const App =({authState,userDetails}) => {
  var params="any data";

  var obj;
  var allData = {name: 'shiv'}
  

  database()
  .ref('/users')
  .once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
    obj=snapshot.val();
    
  });

  
  
  
 
 
  

  const dispatch = useDispatch();



  const onAuthStateChanged = (user) => {
  
   

    if (user) {
     // const useshiv = auth().currentUser;

     
     //setDetails(useshiv);
  
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: true
      })

  

      database()
        .ref(`/users/${user._user.uid}`)
        .on('value', (snapshot) => {
          console.log('USER DETAILS', snapshot.val())
        //  console.log(snapshot.val().mobilep)
        //  const d = snapshot.val().mobilep;
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          })
        })

        


    } else {
      dispatch({
        type: IS_AUTHTHENTICATED,
        payload: false
      })
    }
    
  }



  useEffect(() => {
    requestPermission()
    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged)
    return susbcriber;
  }, [])

  if (authState.loading) {
      return <EmptyContainer/>
  }

  
    // if(userDetails){
        
    //     dataObject = Object.assign({}, userDetails);
    //     tempValue=dataObject.type;
    // }
    // console.log(tempValue)

  

    return(
        
        <>
 
        <NavigationContainer>
          
          {authState.isAuthenticated ? (
          <>
          {console.log("you are authenticated")}
          <Drawer.Navigator initialRouteName="BottomTabsRoot" drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
        <Drawer.Screen name="AboutStackScreen" component={AboutStackScreen}  />
        <Drawer.Screen name="ProfileStackScreen" component={ProfileStackScreen} />
        <Drawer.Screen name="MyEventsStackScreen" component={MyEventsStackScreen} />
        <Drawer.Screen name="ResetPasswordStackScreen" component={ResetPasswordStackScreen} />
        <Drawer.Screen name="SupportStackScreen" component={SupportStackScreen} />
        <Drawer.Screen name="AccountStackScreen" component={AccountStackScreen} />
      </Drawer.Navigator>
          
          

          </>) : (
          <>
          <Stack.Navigator
          screenOptions={{
            header: (props) => <CustomHeader {...props} />,
          }}
          >
            
            
          
              
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="Participant" component={Participant} />
              <Stack.Screen name="SignUp" component={SignUp} />
              
            
            
          
          </Stack.Navigator>
           
          </>) }
          
          </NavigationContainer>

         
      
        </>  
        
    )
}

const mapStateToProps = (state) => ({
  authState: state.auth,
  userDetails: state.auth.user
})

App.propTypes = {
  userDetails: propTypes.object
}

export default connect(mapStateToProps)(App)