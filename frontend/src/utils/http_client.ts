import axios from "axios";
const httpClient = axios;
httpClient.interceptors.request.use(
  function (config) {
    config.timeout = 15000;
    config.baseURL = "http://172.21.2.75:5000";
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default httpClient;
