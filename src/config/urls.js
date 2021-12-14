//live
// export const API_BASE_URL = 'https://api.royodispatch.com/api';

//Staging
 export const API_BASE_URL = 'https://api.rdstaging.com/api';

//tranzit app domain
//export const API_BASE_URL = 'https://dispatch.tranzit.app/api';

//klickmat/snabbhem app domain
// export const API_BASE_URL = 'https://delivery.snabbhem.se/api';

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
// export const API_BASE_URL = 'https://dispatch.africanize.co/api'
// orderchekout
// export const API_BASE_URL ='https://dispatch.orderchekout.com/api'
// carroi
// export const API_BASE_URL = 'https://carroi.rdstaging.com/api';
//Developement
// export const API_BASE_URL = 'https://api.winhires.com/api';
//export const API_BASE_URL = 'http://192.168.96.20:8010/api';
// export const API_BASE_URL = 'http://192.168.103.73:8005';
//export const API_BASE_URL = 'https://api.williamherrick.com/api';
// export const API_BASE_URL = 'http://192.168.103.73:8005/api';

export const personaltoken = 'TMJdbQlNWkYl1JzMONzRgF4zQFuP8s';
export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const SEND_OTP = getApiUrl('/auth/login');
export const LOGIN_API = getApiUrl('/auth/sendOtp');
export const SIGNUP_API = getApiUrl('/auth/signup');
export const LOGOUT_API = getApiUrl('/auth/logout');

// export const SIGN_UP_API = getApiUrl('/auth/register');
export const APP_INITIAL_SETTINGS = getApiUrl('/shortCode');
export const PRIVACYANDTERMSANDCONDITIONS = getApiUrl('/cmscontent');

//Task Apis
export const GETTASKS = getApiUrl('/taskList');
export const GETTASKHISTORY = getApiUrl('/task/history');
export const UPDATEONOFFDUTYSTATUS = getApiUrl('/updateStatus');
export const UPDATETASKSTATUS = getApiUrl('/updateTaskStatus');
export const ACCEPTREJECTSTATUS = getApiUrl('/task/accecpt/reject');

//Logs
export const LOGSAPI = getApiUrl('/agent/logs');
export const SIGNUPDOC = getApiUrl('/auth/new-send-documents');
export const DRIVEROTP = getApiUrl('/checkOTPRequried');

//Wallet
export const GETWALLETDATA = getApiUrl('/agent/transaction/details');
