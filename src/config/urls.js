//live
export const API_BASE_URL = 'https://api.royodispatch.com/';

//Staging
// export const API_BASE_URL = 'https://api.rdstaging.com/';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const SEND_OTP = getApiUrl('api/auth/login');
export const LOGIN_API = getApiUrl('api/auth/sendOtp');
export const SIGNUP_API = getApiUrl('api/auth/signup');
export const LOGOUT_API = getApiUrl('api/auth/logout');

// export const SIGN_UP_API = getApiUrl('/auth/register');
export const APP_INITIAL_SETTINGS = getApiUrl('api/shortCode');
export const PRIVACYANDTERMSANDCONDITIONS = getApiUrl('api/cmscontent');

//Task Apis
export const GETTASKS = getApiUrl('api/taskList');
export const GETTASKHISTORY = getApiUrl('api/task/history');
export const UPDATEONOFFDUTYSTATUS = getApiUrl('api/updateStatus');
export const UPDATETASKSTATUS = getApiUrl('api/updateTaskStatus');
export const ACCEPTREJECTSTATUS = getApiUrl('api/task/accecpt/reject');

//Logs
export const LOGSAPI = getApiUrl('api/agent/logs');
export const SIGNUPDOC = getApiUrl('api/auth/new-send-documents');
export const DRIVEROTP = getApiUrl('api/checkOTPRequried');

//Wallet
export const GETWALLETDATA = getApiUrl('api/agent/transaction/details');
export const PAYMENTOPTIONS = getApiUrl('api/payment/options');
export const WALLET_CREDIT = getApiUrl('api/agentWallet/credit');

// get Notification Data
export const CUSTOMNOTIFICATIONPAYLOAD = getApiUrl('api/notification/tracking');

//Payout
export const AGENT_PAYOUT = getApiUrl('api/agent/payout/request/create');
export const AGENT_PAYOUT_DETAILS = getApiUrl('api/agent/payout/details');
export const AGENT_BANK_DETAILS = getApiUrl('api/agent/bank/details');

//DAMAGETYPE
export const GET_DAMAGE_TYPES = getApiUrl('api/damagetypes');
export const DAMAGE_REPORTS = getApiUrl('api/agent/reportdamange');

//Reimbursement
export const GET_REIMBURSEMENT_TYPES = getApiUrl('api/reimbursementtypes');
export const REIMBURSEMENT = getApiUrl('api/agent/create/reimbursement');
export const GETORDERDETAILFORTASK = getApiUrl(
  'edit-order/vendor/products/getProductsInCart',
);
export const GETCANCELORDERREASONLIST = getApiUrl('api/order/cancel/reasons');
export const CANCELORDER = getApiUrl('api/order/cancel/request/create');
export const GETWEBURL = getApiUrl('api/payment');
