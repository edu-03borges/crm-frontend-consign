import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from '../store/actions';

export const userSignInSuccess = (userInfo) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    indo: "stores user data",
    payload: userInfo,
  };
};

export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
    info: "removes user data",
  };
};