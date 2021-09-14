import {GETTASKS} from '../../config/urls';
import {apiGet} from '../../utils/utils';
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
