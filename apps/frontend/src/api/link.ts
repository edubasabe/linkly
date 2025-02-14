import { api } from ".";

export interface Link {
  id: string;
  shortCode: string;
  original: string;
  shortUrl: string;
  clicks: number;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

export const createLink = async (url: string): Promise<Link> => {
  return await api.post<Link>("/api/links", { original: url });
};

export const updateLink = async (
  id: string,
  data: Partial<Link>
): Promise<Link> => {
  return await api.patch<Link>(`/api/links/${id}`, data);
};

export const deleteLink = async (id: string): Promise<void> => {
  return await api.delete(`/api/links/${id}`);
};

export const getAllLinks = async (): Promise<Link[]> => {
  return await api.get<Link[]>("/api/links");
};
