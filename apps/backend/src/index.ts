import { app } from "./app.js";
import prisma from "@/lib/prisma.js";
import { logger } from "@/lib/logger.js";

const PORT = process.env.PORT || 3000;

// Start the server
const server = app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`🚀 Server is running on http://localhost:${PORT}`);
  } catch (error) {
    logger.error("❌ Error connecting to the database:", error);
    process.exit(1);
  }
});

// Handle shutdown gracefully
process.on("SIGINT", async () => {
  logger.info("🔴 Shutting down server...");
  await prisma.$disconnect();
  server.close(() => {
    logger.info("🛑 Server closed.");
    process.exit(0);
  });
});
