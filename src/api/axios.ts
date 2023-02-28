import axios, { AxiosInstance } from "axios";

const host = process.env.REACT_APP_PUBLIC_BASE_URL;

//api instance 모듈화
export const api: AxiosInstance = axios.create({
  baseURL: `${host}/v1/api`,
});
