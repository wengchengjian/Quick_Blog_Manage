import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CommRequest } from "@/types/req";
import { CommResponse } from "@/types/res";

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  timeout: 5000
}




class Request {

  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(config);
    this.instance.interceptors.response.use((res) => {
      return res.data;
    }, (err) => { })
    this.instance.interceptors.request.use((req) => {
      return req;
    }, (err) => { })

    const token = localStorage.getItem('self_blog_token');
    if (token) {
      this.setAuth(token);
    }
  }

  setAuth(token: string) {
    this.instance.defaults.headers.common['Authorization'] = token;
  }
  async get<PATH extends keyof CommRequest, PARAMS = CommRequest[PATH]>(path: PATH, params?: PARAMS): Promise<CommResponse[PATH]> {
    return await this.instance.get(path, { params });
  }

  async post<PATH extends keyof CommRequest, DATA = CommRequest[PATH]>(path: PATH, data?: DATA): Promise<CommResponse[PATH]> {
    return this.instance.post(path, data)
  }

  async put<PATH extends keyof CommRequest, DATA = CommRequest[PATH]>(path: PATH, data?: DATA): Promise<CommResponse[PATH]> {
    return this.instance.put(path, data)
  }

  async delete<PATH extends keyof CommRequest, DATA = CommRequest[PATH]>(path: PATH, data?: DATA): Promise<CommResponse[PATH]> {
    return this.instance.put(path, data)
  }
}

const request = new Request();

export default request;