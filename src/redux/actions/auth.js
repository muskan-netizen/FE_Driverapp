import {LOGIN_API, LOGOUT_API,SEND_OTP, SIGNUP_API} from '../../config/urls';
import {apiGet, apiPost, setUserData} from '../../utils/utils';
import store from '../store';
import types from '../types';
const {dispatch} = store;

export const saveUserData = data => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

export function login(data = {}, headers = {}) {
  console.log(data, 'login>data>data>data');
  return new Promise((resolve, reject) => {
    apiPost(LOGIN_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function signUp(data = {}, headers = {}) {
  console.log(data, 'login>data>data>data');
  return new Promise((resolve, reject) => {
    apiPost(SIGNUP_API, data, headers)
      .then(async res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const updataeUserData = data => {
  setUserData(data).then(suc => {
    dispatch({
      type: types.UPDATEUSER,
      payload: data,
    });
  });
};

export function verifyAccount(data = {}, headers = {}) {
  console.log(data, 'verifyAccount>data>data>data');
  return new Promise((resolve, reject) => {
    apiPost(SEND_OTP, data, headers)
      .then(async res => {
        setUserData(res.data).then(suc => {
          saveUserData(res.data);
          resolve(res);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}


//logout 

export function logout(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(LOGOUT_API, data, headers)
      .then(async res => {
        setUserData(null).then(suc => {
          saveUserData({});
          resolve(res);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}