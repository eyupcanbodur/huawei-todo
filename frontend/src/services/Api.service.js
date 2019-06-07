import ApiConstants from "../constants/API.constants";
import axios from "axios";

const addUri = endpoint => {
  return ApiConstants.API_URL + endpoint;
};

export const API_GET = (endpoint, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(addUri(endpoint), params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const API_POST = (endpoint, payload, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(addUri(endpoint), payload, params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const API_DELETE = (endpoint, params) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(addUri(endpoint), params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const API_PUT = (endpoint, payload, params) => {
  return new Promise((resolve, reject) => {
    axios
      .put(addUri(endpoint), payload, params)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
