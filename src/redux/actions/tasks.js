import {
  ACCEPTREJECTSTATUS,
  DRIVEROTP,
  GETTASKHISTORY,
  GETTASKS,
  GETWALLETDATA,
  UPDATEONOFFDUTYSTATUS,
  UPDATETASKSTATUS,
  GETORDERUPDATEDETAILS,
  PAYMENTOPTIONS,
  WALLET_CREDIT,
  AGENT_PAYOUT,
  AGENT_PAYOUT_DETAILS,
  AGENT_BANK_DETAILS,
  GET_DAMAGE_TYPES,
  DAMAGE_REPORTS
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

export function getPaymentOptions(uri = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(PAYMENTOPTIONS + uri, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function walletCredit(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(WALLET_CREDIT, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function agentPayoutCreate(url, data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(AGENT_PAYOUT + url, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function agentPayoutDetails(uri = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(AGENT_PAYOUT_DETAILS + uri, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function agentBankDetails(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(AGENT_BANK_DETAILS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Get Damage types
export function getAllDamageTypes(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_DAMAGE_TYPES, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Damage report
export function damageReport(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(DAMAGE_REPORTS, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}



//Get Reimbursement types
export function getAllReimbursementTypes(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_REIMBURSEMENT_TYPES, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Reimbursement report
export function reimbursement(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(REIMBURSEMENT, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}

//Get customre order detail
export function getCustomerOrderDetail(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_REIMBURSEMENT_TYPES, data, headers)
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}



