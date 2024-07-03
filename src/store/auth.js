import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from './actions';

const INITIAL_STATE = {
  userInfo: null,
}

export default function reducerRedux(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      }
    case SIGNOUT_USER_SUCCESS:
      return {
        ...state,
        userInfo: null,
      }
    default:
      return state;
  }
}