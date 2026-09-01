//BASE_URL - denotes global configuration
const BASE_URL = "https://dummyjson.com";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
};


// Generic function which will return the unwrapped api call
async function request<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", headers = {}, body, signal } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
}

export const client = {
  //GET Mmethod
  get: <T>(
    endpoint: string, 
    signal?: AbortSignal
  ) =>
    request<T>(endpoint, { method: "GET", signal }),

  //POST Method
  post: <T>(
    endpoint: string,
    body: unknown,
    signal?: AbortSignal,
  ) =>
    request<T>(endpoint, {
      method: "POST",
      body,
      signal,
    }),

  //Patch Method
  patch: <T>(
    endpoint: string,
    body: unknown,
    signal?: AbortSignal,
  ) =>
    request<T>(endpoint, {
      method: "PATCH",
      body,
      signal,
    }),

  //PUT Method
  put: <T>(
    endpoint: string,
    body: unknown,
    signal?: AbortSignal,
  ) =>
    request<T>(endpoint, {
      method: "PUT",
      body,
      signal,
    }),

  //Delete Method
  delete: <T>(endpoint: string, signal?: AbortSignal) =>
    request<T>(endpoint, {
      method: "DELETE",
      signal,
    }),
};
