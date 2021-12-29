import store from '../store';
import types from '../types';
const {dispatch} = store;
import {
  apiGet,
  apiPost,
  saveShortCodeData,
  setClientInfo,
  setDefaultSelectedLanguage,
  setUserData,
} from '../../utils/utils';
import {
  APP_INITIAL_SETTINGS,
  PRIVACYANDTERMSANDCONDITIONS,
  LOGSAPI,
} from '../../config/urls';

export function initApp(data = {}, headers = {}, reload = false) {
  return new Promise((resolve, reject) => {
    apiPost(APP_INITIAL_SETTINGS, data, headers)
      .then(async res => {
        let data = res?.data;
        setClientInfo(data).then(suc => {
          dispatch({
            type: types.APP_INIT,
            payload: data,
          });
          resolve(res);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Get List of payment method
export function getListOfAllCmsLinks(url = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(PRIVACYANDTERMSANDCONDITIONS + url, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export const updateInternetConnection = data => {
  dispatch({
    type: types.NO_INTERNET,
    payload: data,
  });
};

//Save your short code
export function saveShortCode(data = {}) {
  saveShortCodeData(data).then(suc => {
    dispatch({
      type: types.SAVE_SHORT_CODE,
      payload: data,
    });
  });
}

export const saveUserData = data => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};

//Logs api hitting after  some  frequent interval

export function logsApi(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(LOGSAPI, data, headers)
      .then(res => {
        setUserData(res?.data?.user).then(suc => {
          saveUserData(res?.data?.user);
          resolve(res);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function isModalVisibleForAcceptReject(data = false) {
  console.log(data, 'data');
  dispatch({
    type: types.MODAL_VISIBLE_ACCEPT_REJECT,
    payload: data,
  });
}

export function updateHomepage(data = false) {
  console.log(data, 'data');
  dispatch({
    type: types.UPDATE_HOME_PAGE,
    payload: data,
  });
}

//sessionLogoutUser logout key
export function sessionLogoutUser(data = false) {
  console.log(data, 'data');
  dispatch({
    type: types.SESSIONLOGOUT,
    payload: data,
  });
}

export function setDefaultLanguage(data = {}) {
  setDefaultSelectedLanguage(data).then(suc => {
    dispatch({
      type: types.DEFAULTLANGUAGE,
      payload: data,
    });
  });
}

export const saveFcmToken = data => {
  console.log(data, 'datadata');
  dispatch({
    type: types.FCMTOKEN,
    payload: data,
  });
};
