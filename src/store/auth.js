import { getToken } from 'utils';

import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
} from './actions';

const INIT_STATE = {
  authUser: getToken(),
  authUserInfo: null,
  alertMessage: '',
  showMessage: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        authUser: action.payload.id_uuid,
        authUserInfo: action.payload,
      };
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        authUserInfo: null,
      };
    }
    default:
      return state;
  }
};
