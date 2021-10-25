// export const API_BASE_URL = 'https://api.royodispatch.com/api';
export const API_BASE_URL = 'https://api.rdstaging.com/api';
// export const API_BASE_URL = 'https://sales.winhires.com/api';

//export const API_BASE_URL = 'http://192.168.96.146:8080/api';

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
