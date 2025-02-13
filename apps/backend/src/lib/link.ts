import { customAlphabet } from "nanoid";

export const generateShortCode = ({ length = 6 } = {}) => {
  const nanoid = customAlphabet(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    length
  );
  return nanoid();
};
