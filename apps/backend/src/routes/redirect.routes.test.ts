import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Redirect Routes", () => {
  it("should map GET /:shortCode to redirectController", async () => {
    const created = await request(app).post("/api/links").send({
      original: "https://example.com",
    });

    await request(app).get(`/${created.body.shortCode}`);
    expect(302);
  });

  it("should return 404 if link id is not found", async () => {
    const response = await request(app).get("/not-found-id");

    expect(response.status).toBe(404);
  });
});
