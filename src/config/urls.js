//live
//export const API_BASE_URL = 'https://api.royodispatch.com/api';

//Staging
export const API_BASE_URL = 'https://api.rdstaging.com/';

// fleety staging domain
//export const API_BASE_URL = 'https://fleety.rdstaging.com/';

//carroi app domain
//export const API_BASE_URL = 'https://carroi.rostaging.com/api';

//tranzit app domain
//export const API_BASE_URL = 'https://dispatch.tranzit.app/api';

//klickmat/snabbhem app domain
//export const API_BASE_URL = 'https://delivery.snabbhem.se/api';

// pinkjet
// export const API_BASE_URL ='https://dispatch.pinkjettaxi.com/api';
// Yoho
// export const API_BASE_URL = 'https://dispatch.yohopartner.com/api';
// tranzit
// export const API_BASE_URL = 'https://dispatch.tranzit.app/api';
// cannabusxpress
// export const API_BASE_URL = 'https://dispatch.cannabusxpress.com/api'
// govachow
// export const API_BASE_URL = 'https://dispatch.govachow.com/api'
// africanize
//export const API_BASE_URL = 'https://dispatch.africanize.co/api'
//Developement
// export const API_BASE_URL = 'https://api.winhires.com/api';
//export const API_BASE_URL = 'http://192.168.96.20:8010/api';
// export const API_BASE_URL = 'http://192.168.103.73:8005';
//export const API_BASE_URL = 'https://api.williamherrick.com/api';
// export const API_BASE_URL = 'http://192.168.103.73:8005/api';

// destinationops app domain
//export const API_BASE_URL = 'https://dispatch.destinationops.com/api';

export const personaltoken = 'TMJdbQlNWkYl1JzMONzRgF4zQFuP8s';
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

// get Notification Data
export const CUSTOMNOTIFICATIONPAYLOAD = getApiUrl('api/notification/tracking');
