import store from '../store';
import types from '../types';
const {dispatch} = store;
import {apiGet, apiPost, saveShortCodeData, setClientInfo} from '../../utils/utils';
import {
  APP_INITIAL_SETTINGS,
  PRIVACYANDTERMSANDCONDITIONS,
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
  saveShortCodeData(data).then((suc) => {
    dispatch({
      type: types.SAVE_SHORT_CODE,
      payload: data,
    });
  });
}
