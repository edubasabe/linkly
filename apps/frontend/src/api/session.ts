import { api } from ".";

export const getSession = async () => {
  return await api.get<string>("/api/sessions");
};
