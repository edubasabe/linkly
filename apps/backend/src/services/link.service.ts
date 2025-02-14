import { generateShortCode } from "@/lib/link";
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
  const newLink = await prisma.link.create({
    data: {
      original,
      shortCode,
      sessionId,
      shortUrl,
    },
  });

  return newLink;
};

export const getAllLinks = async (sessionId: string) => {
  const links = await prisma.link.findMany({
    where: { sessionId },
  });

  return links;
};

export const getLinkById = async (id: string) => {
  const link = await prisma.link.findUnique({
    where: { id },
  });
  if (!link) {
    throw new Error("Link not found");
  }
  return link;
};

export const updateLink = async (id: string, data: Prisma.LinkUpdateInput) => {
  const link = await prisma.link.update({
    where: { id },
    data,
  });
  return link;
};

export const DeleteLinkSchema = z.object({
  id: z.string(),
});
export const deleteLink = async (id: string) => {
  await prisma.link.delete({
    where: { id },
  });
};
