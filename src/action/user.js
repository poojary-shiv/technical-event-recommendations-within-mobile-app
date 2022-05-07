import database from '@react-native-firebase/database';
import {SET_USERS, ERROR_USERS} from './action.types';

export const getUsers = () => async (dispatch) => {
  try {
    database()
      .ref('/users/')
      .on('value', (snapshot) => {
        console.log('All User data: ', snapshot.val());
        if (snapshot.val()) {
          dispatch({
            type: SET_USERS,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_USERS,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_USERS,
    });
  }
};
