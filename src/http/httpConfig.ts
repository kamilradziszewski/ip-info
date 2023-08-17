import axios from "axios";

const http = axios.create({
  baseURL: "http://ip-api.com/batch",
  method: "post",
  headers: {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "*",
  },
});

http.interceptors.response.use(
  function (response) {
    response.headers.responseTime = Date.now();
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default http;
