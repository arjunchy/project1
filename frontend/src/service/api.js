import axios from 'axios';

import { API_NOTIFICATION, SERVICE_URL } from '../constant/config.js';

const API_URL = "http://localhost:8000";

// Create an axios instance with baseURL and timeout
const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    // Success
    function (config) {
        return config;
    },
    // Error
    function (error) {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    // Success
    function (response) {
        // Stop global loader here
        return processResponse(response);
    },
    // Stop loader in case of error
    function (error) {
        return Promise.reject(processError(error));
    }
);

// Process the response data
// if success -> return { isSuccess : true, data : Object }
// if error -> return { isError : true, status : string, msg : string, code : int }
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isError: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        };
    }
}

// Process the error from response
const processError = (error) => {
    if (error.response) {
        // Error when the response is not success (status code other than 200)
        console.log("Error in response", JSON.stringify(error));
        return {
            isError: true,
            msg: API_NOTIFICATION.responseError,
            error: error.response.status,
            code: error.response.data?.code || ""
        };
    } else if (error.request) {
        // Error when the request is sent but no response is received
        console.log("Error in request", JSON.stringify(error));
        return {
            isError: true,
            msg: API_NOTIFICATION.requestError,
            error: error.request
        };
    } else {
        // Something happened while setting up the request that triggered an error
        console.log("Error in setting up request", JSON.stringify(error));
        return {
            isError: true,
            msg: API_NOTIFICATION.networkError,
            error: error.message
        };
    }
}

// API method configuration from SERVICE_URL
const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    return axiosInstance({
      method: value.method,
      url: value.url,
      data: body,
      responseType: value.responseType,
      onUploadProgress: (progressEvent) => {
        if (showUploadProgress) {
          let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showUploadProgress(percent);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (showDownloadProgress) {
          let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          showDownloadProgress(percent);
        }
      },
    });
  };
}

export { API };
