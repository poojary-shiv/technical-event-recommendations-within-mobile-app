import {SET_USERS, ERROR_USERS} from '../action/action.types';

const initialState = {
  users: null,
  loading: true,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: false,
      };

    case ERROR_USERS:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
