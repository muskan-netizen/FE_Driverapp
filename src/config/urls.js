export const API_BASE_URL = 'https://api.royodispatch.com/api';

export const getApiUrl = endpoint => API_BASE_URL + endpoint;

export const SEND_OTP = getApiUrl('/auth/login');
export const LOGIN_API = getApiUrl('/auth/sendOtp');
// export const SIGN_UP_API = getApiUrl('/auth/register');
export const APP_INITIAL_SETTINGS = getApiUrl('/shortCode');
export const PRIVACYANDTERMSANDCONDITIONS = getApiUrl('/cmscontent');

//Task Apis
export const GETTASKS = getApiUrl('/taskList');
export const GETTASKHISTORY = getApiUrl('/task/history');
export const UPDATEONOFFDUTYSTATUS = getApiUrl('/updateStatus');

