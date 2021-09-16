import {
  GETTASKHISTORY,
  GETTASKS,
  UPDATEONOFFDUTYSTATUS,
} from '../../config/urls';
import {apiGet, apiPost} from '../../utils/utils';
import store from '../store';
const {dispatch} = store;

//Get List of payment method
export function getListOfTasks(url = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GETTASKS + url, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Get List of payment method
export function getListOfTaskHistory(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GETTASKHISTORY, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//ON/OFF ton duty and off duty data

export function onOffDuty(uri = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(UPDATEONOFFDUTYSTATUS + uri, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
