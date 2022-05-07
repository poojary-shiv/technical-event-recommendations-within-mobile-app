import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'


export const signUp = (data) => async (dispatch) => {
    console.log(data)
    const emptyarr=['id'];
    const {name, description, address, email, password, image} = data

    auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
        console.log(data)
        console.log("User creation was succes")

        database()
        .ref('/users/' + data.user.uid)
        .set({
            name, 
            description,
            address,
            email,
            password,
            image,
            type: 'organizer',
            bookmarkedEvents: emptyarr,
            uid: data.user.uid
        })
        .then(() => console.log('Data set success'))
        Snackbar.show({
            text: 'account created',
            textColor: 'white',
            backgroundColor: "green"
        })
    })
    .catch((error) => {
        console.error(error)
        Snackbar.show({
            text: "Signup failed",
            textColor: 'white',
            backgroundColor:'red'
        })
    })
    
}

export const participant = (data) => async (dispatch) => {
    console.log(data)
    const emptyarr=['id'];
    const {namep, emailp, mobilep, passwordp, descriptionp, skillsp, listPreferences, imagep} = data

    auth().createUserWithEmailAndPassword(emailp, passwordp)
    .then((data) => {
        console.log(data)
        console.log("User creation was succes")

        database()
        .ref('/users/' + data.user.uid)
        .set({
            namep, 
            emailp, 
            mobilep,
            passwordp,
            descriptionp,
            skillsp,
            listPreferences,
            type: 'participant',
            picture: imagep,
            bookmarkedEvents: emptyarr,
            registeredEvents: emptyarr,
            uid: data.user.uid
        })
        .then(() => console.log('Data set success'))
        Snackbar.show({
            text: 'account created',
            textColor: 'white',
            backgroundColor: "green"
        })
    })
    .catch((error) => {
        console.error(error)
        Snackbar.show({
            text: "Signup failed",
            textColor: 'white',
            backgroundColor:'red'
        })
    })
}


export const signIn = (data) => async (dispatch) => {
    console.log(data)
    const {email, password} = data

    auth()
        .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Sign in success")
                Snackbar.show({
                    text: "SignIn Success",
                    textColor: "white",
                    backgroundColor: "green"
                })
            })
            .catch((error) => {
                console.error(error)
                Snackbar.show({
                    text: "Signin failed",
                    textColor: "white",
                    backgroundColor: "red"
                })
            })
}

export const signOut = () => async (dispatch) => {
    auth()
    .signOut()
    .then(() => {
        Snackbar.show({
            text: "SignOut success",
            textColor: "white",
            backgroundColor: "green"
        })
    })
    .catch((error) => {
        console.log(error)
        Snackbar.show({
            text: "Signout failed",
            textColor: "white",
            backgroundColor: "red"
        })
    })
}