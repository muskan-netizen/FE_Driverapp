import {
  ACCEPTREJECTSTATUS,
  DRIVEROTP,
  GETTASKHISTORY,
  GETTASKS,
  GETWALLETDATA,
  UPDATEONOFFDUTYSTATUS,
  UPDATETASKSTATUS,
  GETORDERUPDATEDETAILS,
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
export function getListOfTaskHistory(uri = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GETTASKHISTORY + uri, data, headers)
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

//cancel task

export function cancelTask(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(UPDATETASKSTATUS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function updateTask(data = {}, headers = {}) {
  console.log(data, 'data in task task proof');
  return new Promise((resolve, reject) => {
    apiPost(UPDATETASKSTATUS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function acceptRejectTask(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(ACCEPTREJECTSTATUS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function sendOtpToDriver(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(DRIVEROTP, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getWalletData(uri = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GETWALLETDATA + uri, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getProductUpdateDetails(uri = '', data = {}, headers = {}) {
  console.log(uri, 'uri in actions >>>>>>>>>>>');
  return new Promise((resolve, reject) => {
    apiGet(uri, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
