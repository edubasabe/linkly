export const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  post: async <ResponseType>(
    endpoint: string,
    data: unknown
  ): Promise<ResponseType> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to post");
    }

    return new Promise((resolve, reject) => {
      response.json().then(resolve).catch(reject);
    });
  },
  get: async <ResponseType>(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<ResponseType> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      ...params,
    });

    if (!response.ok) {
      throw new Error("Failed to get");
    }

    return response.json();
  },
  patch: async <ResponseType>(
    endpoint: string,
    data: unknown
  ): Promise<ResponseType> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to patch");
    }

    return response.json();
  },
  delete: async (endpoint: string): Promise<void> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete");
    }

    return await Promise.resolve();
  },
};
