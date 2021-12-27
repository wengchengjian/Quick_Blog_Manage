import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { CommRequest } from "@/types/req";
import { CommResponse } from "@/types/res";
import { ElMessage } from "element-plus";
const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  timeout: 5000
}




class Request {

  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create(config);
    this.instance.interceptors.response.use((res) => {
      const data = res.data;
      if (data.code !== 0) {
        ElMessage({ message: data.message, type: 'error', grouping: true });
      }
      return data.data;
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
  getAuth() {
    return this.instance.defaults.headers.common['Authorization']
  }

  async get<PATH extends keyof CommRequest, PARAMS = CommRequest[PATH], RES = CommResponse[PATH]>(path: PATH, params?: PARAMS): Promise<RES> {
    return await this.instance.get(path, { params });
  }

  async post<PATH extends keyof CommRequest, DATA = CommRequest[PATH], RES = CommResponse[PATH]>(path: PATH, data?: DATA): Promise<RES> {
    return this.instance.post(path, data)
  }

  async put<PATH extends keyof CommRequest, DATA = CommRequest[PATH], RES = CommResponse[PATH]>(path: PATH, data?: DATA): Promise<RES> {
    return this.instance.put(path, data)
  }

  async delete<PATH extends keyof CommRequest, DATA = CommRequest[PATH], RES = CommResponse[PATH]>(path: PATH, data?: DATA): Promise<RES> {
    return this.instance.delete(path, { data })
  }
}

const request = new Request();

export default request;