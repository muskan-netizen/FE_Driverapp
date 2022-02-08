//live
export const API_BASE_URL = 'https://api.royodispatch.com/';

//Staging
//export const API_BASE_URL = 'https://api.rdstaging.com/';

//sales royodispatch
//export const API_BASE_URL = 'https://sales.royodispatch.com/';

// export const API_BASE_URL = 'http://192.168.96.152:8006/'; // preet local url
// export const API_BASE_URL = 'http://192.168.102.23:8005/'; // Gourav.s local url
// export const API_BASE_URL = 'http://192.168.97.104:8010/'; // Sujata.s local url

//MARTINONWHEELSz
// export const API_BASE_URL = 'https://dispatch.martinionwheelsllc.org/';

// VICI
// export const API_BASE_URL = 'https://envios.vici.la/'

//trucktirenow
//export const API_BASE_URL = 'https://dispatch.trucktirenow.com/';

//AgreeOnline
//export const API_BASE_URL = 'https://dispatch.agrionline.ph/';

// fleety staging domain
//export const API_BASE_URL = 'https://fleety.rdstaging.com/';

//klickmat/snabbhem app domain
// export const API_BASE_URL = 'https://delivery.snabbhem.se/';

// pinkjet
// export const API_BASE_URL = 'https://dispatch.pinkjettaxi.com/';

// Yoho
//export const API_BASE_URL = 'https://dispatch.yohopartner.com/';

// cannabusxpress
// export const API_BASE_URL = 'https://dispatch.cannabusxpress.com/'
// govachow
//export const API_BASE_URL = 'https://dispatch.govachow.com/';
// africanize
// export const API_BASE_URL = 'https://dispatch.africanize.co/'
// orderchekout
//export const API_BASE_URL = 'https://dispatch.orderchekout.com/';
// carroi
// export const API_BASE_URL = 'https://carroi.rdstaging.com/';
// hairstonexpressgo
//export const API_BASE_URL = 'https://dispatch.hairstonexpressgo.com/';

//Developement
//export const API_BASE_URL = 'https://api.winhires.com/';

//export const API_BASE_URL = 'http://192.168.96.20:8010/';
// export const API_BASE_URL = 'http://192.168.103.73:8005';
// export const API_BASE_URL = 'https://api.williamherrick.com/';
// export const API_BASE_URL = 'http://192.168.103.73:8005/';

// blip
//export const API_BASE_URL = 'https://dispatch.blipdelivery.com/';

// grub and gusto
// export const API_BASE_URL = 'https://grub.royodispatch.com/'

// destinationops app domain
//export const API_BASE_URL = 'https://dispatch.destinationops.com/';

// somame live domain
// export const API_BASE_URL = 'https://dispatch.somame-247.com/'

// codiner live domain
//export const API_BASE_URL = 'https://dispatch.codiner.com/';

// click-eat
// export const API_BASE_URL = 'https://dispatcher.click-eat.com/'

// halalhmc
//export const API_BASE_URL = 'https://dispatcher.halalhmc.org/';
// tranznet online
// export const API_BASE_URL = 'https://dispatcher.tranzonline.com/'
// runrun live domain
//export const API_BASE_URL = 'https://dispatcher.runrun.ae/';

// drivree live domain
//export const API_BASE_URL = 'https://dispatcher.drivereeshops.com/';

// helpNowRightNow live domain
//export const API_BASE_URL = 'https://dispatch.helpnowrightnow.com/';

// tranzit live domain
//export const API_BASE_URL = 'https://dispatch.tranzit.app/';
// africanvillage
// export const API_BASE_URL = 'https://dispatch.africanvillage.market/'
// swiftandvalu
// export const API_BASE_URL = 'https://dispatch.swiftandvalu.com/'

//loopwhole live domain
//export const API_BASE_URL = 'https://dispatch.loopwhole.ca/';

//donepacked live domain
//export const API_BASE_URL = 'https://dispatch.donepacked.com/';

// elcheregio live domain
//export const API_BASE_URL = 'https://dispatch.elcheregio.mx/';

// sunshinerideshare live domain
//export const API_BASE_URL = 'https://dispatch.sunshinerideshare.com/';

//taquick live domain
//export const API_BASE_URL = 'https://dispatch-dev.taquick.com/';

//stonses live domain
//export const API_BASE_URL = 'https://dispatcher.verofax.com/';

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
