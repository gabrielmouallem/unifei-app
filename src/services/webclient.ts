import axios from "axios";

import Store from "../redux/index";
import {URL} from "../env";
import checkExists from "../utils/checks/checkExists";

export const baseURL = {
  ping: "https://google.com",
  core: URL
};

export const coreHTTPClient = axios.create({
  baseURL: baseURL.core,
  responseType: "json",
  timeout: 90000
});

coreHTTPClient.interceptors.request.use(
  config => {
    if (checkExists(getAuthorization())) {
      config.headers.Authorization = `Token ${getAuthorization()}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export const coreHTTPClientOld = axios.create({
  baseURL: baseURL.core,
  responseType: "json",
  timeout: 90000
});

function getAuthorization() {
  return Store().store.getState().auth.token;
}
