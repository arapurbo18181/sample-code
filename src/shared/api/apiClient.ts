import { APIResponse } from "../model";

class ApiClient {
  baseUrl: string;
  constructor() {
    this.baseUrl = import.meta.env.URL || "http://localhost:8000";
  }

  async get<T>(url: string): Promise<APIResponse<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "GET",
    });
    return await response.json();
  }

  async post<T, R>(url: string, body: T, headers?: R): Promise<APIResponse<R>> {
    console.log(`${this.baseUrl}${url}`);
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
      },
    });
    return (await response.json()) as Promise<APIResponse<R>>;
  }
}

export const ApiInstance = Object.freeze(new ApiClient());
