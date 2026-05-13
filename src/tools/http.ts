import axios, { AxiosRequestConfig } from "axios";
import { ApiConfig, HttpResult } from "../types.js";

export class HttpTools {
  constructor(private config: ApiConfig) {}

  async get(path: string, params?: Record<string, string>): Promise<HttpResult> {
    const res = await axios.get(`${this.config.baseUrl}${path}`, {
      params,
      headers: this.config.headers,
      timeout: this.config.timeout,
    });
    return { status: res.status, data: res.data, headers: res.headers as Record<string, string> };
  }

  async post(path: string, body: unknown): Promise<HttpResult> {
    const res = await axios.post(`${this.config.baseUrl}${path}`, body, {
      headers: { ...this.config.headers, "Content-Type": "application/json" },
      timeout: this.config.timeout,
    });
    return { status: res.status, data: res.data, headers: res.headers as Record<string, string> };
  }

  async put(path: string, body: unknown): Promise<HttpResult> {
    const res = await axios.put(`${this.config.baseUrl}${path}`, body, {
      headers: { ...this.config.headers, "Content-Type": "application/json" },
      timeout: this.config.timeout,
    });
    return { status: res.status, data: res.data, headers: res.headers as Record<string, string> };
  }

  async delete(path: string): Promise<HttpResult> {
    const res = await axios.delete(`${this.config.baseUrl}${path}`, {
      headers: this.config.headers,
      timeout: this.config.timeout,
    });
    return { status: res.status, data: res.data, headers: res.headers as Record<string, string> };
  }
}
