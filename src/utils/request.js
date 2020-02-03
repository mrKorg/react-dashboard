import axios from "axios";

import { API_ROOT } from "helpers/constants";

const token = "17403d47899e4f3aad283aee38b5ffa9";

const source = axios.CancelToken.source();
const instance = axios.create({
  baseURL: API_ROOT,
  headers: {
    "Content-Type": "application/json"
  },
  cancelToken: source.token
});

instance.interceptors.request.use(
  config => {
    if (
      config.baseURL === API_ROOT &&
      !config.external &&
      !config.headers.Authorization
    ) {
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
