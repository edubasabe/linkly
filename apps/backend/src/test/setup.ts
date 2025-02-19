import { beforeAll, afterAll, beforeEach } from "vitest";
import prisma from "@/lib/prisma";

beforeAll(async () => {
  try {
    console.log("Pushing Prisma schema to test database...");
    // execSync("pnpm run db:push", { stdio: "inherit" });
  } catch (error) {
    console.error("Failed to push Prisma schema", error);
    process.exit(1);
  }
  return await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  console.log("beforeEach");
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Link" CASCADE;`);
});
