import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { SIGNIN_USER, SIGNOUT_USER } from 'store/actions';
import {
  userSignInSuccess,
  userSignOutSuccess,
} from 'actions/auth';

import { apiAuth } from "utils/api";

const signInWithUserAndPasswordRequest = async (
  count,
  user,
  password,
) => {
  const response = await apiAuth
    .post('/authenticate_user', {
      count,
      user,
      password,
    });

    return response;
}

function* signInWithUserAndPassword({ payload }) {
  const {
    count,
    user,
    password,
  } = payload;

  try {

      const responseAuth = yield call(
          signInWithUserAndPasswordRequest,
          count,
          user,
          password,
      );

      if (responseAuth.status == 200) {
        let access = responseAuth.data;

        localStorage.setItem('tokenconsign', responseAuth.data.token); 

        yield put(userSignInSuccess(access));
      }
  } catch (error) {
    // yield put(showAuthMessage(error));
  }
}

function* signOut() {
  try {
    localStorage.removeItem('tokenconsign');

    yield put(userSignOutSuccess(signOutUser));
  } catch (error) {
    // yield put(showAuthMessage(error));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInWithUserAndPassword);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export default function* rootSaga() {
  yield all([fork(signInUser), fork(signOutUser)]);
}
