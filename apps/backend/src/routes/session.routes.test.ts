import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Session Routes", () => {
  it("should map GET / to createSessionController", async () => {
    const response = await request(app).get("/api/sessions");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: "ok",
      sessionId: expect.any(String),
    });
  });
});
