import { beforeAll, afterAll, beforeEach } from "vitest";
import { execSync } from "child_process";
import prisma from "@/lib/prisma";

beforeAll(async () => {
  try {
    console.log("Wipe test database...");
    execSync("pnpm run db:generate");
    execSync("pnpm run db:push");
  } catch (error) {
    console.error("Failed to wipe database:", error);
    throw error;
  }
  return await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Link" CASCADE;`);
});
