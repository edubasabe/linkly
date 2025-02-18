import { beforeAll, afterAll, beforeEach } from "vitest";
import { execSync } from "child_process";
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
  // Clear the database before each test

  // const tablenames = await prisma.$queryRaw<
  //   Array<{ tablename: string }>
  // >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  // for (const { tablename } of tablenames) {
  //   if (tablename !== "_prisma_migrations") {
  //     try {
  //       await prisma.$executeRawUnsafe(
  //         `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
  //       );
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   }
  // }
});
