import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class HttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data`);
    }
  }
}
