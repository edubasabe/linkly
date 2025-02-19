import { generateShortCode } from "@/lib/link";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const LinkSchema = z.object({
  original: z.string().url(),
  userId: z.string().optional(),
});

export const createLink = async (
  original: string,
  host: string,
  sessionId: string
) => {
  const shortCode = generateShortCode();
  const shortUrl = `${host}/${shortCode}`;
  return await prisma.link.create({
    data: {
      original,
      shortCode,
      sessionId,
      shortUrl,
    },
  });
};

export const getAllLinks = async (sessionId: string) => {
  return await prisma.link.findMany({
    where: { sessionId },
  });
};

export const getLinkById = async (id: string) => {
  logger.info(`Getting link by id: ${id}`);
  return await prisma.link.findUnique({
    where: { id },
  });
};

export const getLinkByShortCode = async (shortCode: string) => {
  logger.info(`Getting link by short code: ${shortCode}`);
  return await prisma.link.findUnique({
    where: { shortCode },
  });
};

export const updateLink = async (id: string, data: Prisma.LinkUpdateInput) => {
  return await prisma.link.update({
    where: { id },
    data,
  });
};

export const DeleteLinkSchema = z.object({
  id: z.string(),
});
export const deleteLink = async (id: string) => {
  return await prisma.link.delete({
    where: { id },
  });
};
