import { AGENT_CHAT, ALL_ROOM_USER, GET_ALL_MESSAGES, SEND_MESSAGE, START_CHAT } from "../../config/urls";
import { apiGet, apiPost } from "../../utils/utils";

export function onStartChat(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(START_CHAT, data, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}



export function fetchAgentChat(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(AGENT_CHAT, data, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}



export function sendMessage(data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiPost(SEND_MESSAGE, data, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}


export function getAllMessages(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(GET_ALL_MESSAGES + query, data, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllRoomUser(query = '', data = {}, headers = {}) {
  return new Promise((resolve, reject) => {
    apiGet(ALL_ROOM_USER + query, data, headers)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

