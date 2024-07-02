import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNIN_USER,
  SIGNOUT_USER,
} from 'store/actions';

export const userSignInSuccess = (user) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user,
  };
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  };
};
export const userSignIn = (user) => {
  return {
    type: SIGNIN_USER,
    payload: user,
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER,
  };
};