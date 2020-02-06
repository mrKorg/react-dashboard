import axios from "axios";

const TOKEN = process.env.REACT_APP_TOKEN;
const API_ROOT = process.env.REACT_APP_API_ROOT;

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
      if (TOKEN) {
        config.headers.Authorization = TOKEN;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
