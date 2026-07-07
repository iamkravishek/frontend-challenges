const BASE_URL = "https://api.datamuse.com";

export type RequestOptions = {
    method ?: "GET" | "POST"
    headers?: HeadersInit
    body?: unknown
    signal?: AbortSignal
}

async function request<T>(
    endpoint : string,
    options : RequestOptions = {}
) : Promise<T>{
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

  if(!response.ok){
    throw new Error (`Http Error : ${response.status}`)
  }

  return response.json();
    
}

export const client = {
  get: <T>(endpoint: string, signal?: AbortSignal) =>
    request<T>(endpoint, { method: "GET", signal }),

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
}