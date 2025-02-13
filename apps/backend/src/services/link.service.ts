import { generateShortCode } from "@/lib/link";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";

export const LinkSchema = z.object({
  original: z.string().url(),
  userId: z.string().optional(),
});

export const createLink = async (original: string) => {
  const shortCode = generateShortCode();
  const newLink = await prisma.link.create({
    data: {
      original,
      shortCode,
    },
  });

  return newLink;
};

export const getAllLinks = async () => {
  const links = await prisma.link.findMany({
    include: { user: true },
  });

  return links;
};

export const getLinkById = async (id: string) => {
  const link = await prisma.link.findUnique({
    where: { id },
    include: { user: true },
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
  id: z.string().uuid(),
});
export const deleteLink = async (id: string) => {
  await prisma.link.delete({
    where: { id },
  });
};
