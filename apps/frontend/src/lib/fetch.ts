const API_URL = import.meta.env.VITE_API_URL;

export const getSession = async () => {
  const response = await fetch(`${API_URL}/api/sessions`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get session");
  }

  return response.json();
};

interface CreatedLink {
  id: string;
  shortCode: string;
  original: string;
  shortUrl: string;
  clicks: number;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}
export const getShortLink = async (longUrl: string): Promise<CreatedLink> => {
  const response = await fetch("/api/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ original: longUrl }),
  });

  if (!response.ok) {
    throw new Error("Failed to get session");
  }

  return response.json();
};
