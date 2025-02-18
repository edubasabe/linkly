import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Link Routes", () => {
  it("should map POST /api/link to createLink controller", async () => {
    const res = await request(app).post("/api/links").send({
      original: "https://example.com",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should return 400 if original is not a valid URL", async () => {
    const res = await request(app)
      .post("/api/links")
      .send({ original: "invalid url" });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      errors: [
        {
          code: "invalid_string",
          message: "Invalid url",
          path: ["original"],
          validation: "url",
        },
      ],
      message: "Validation error",
      status: "error",
    });
  });

  it("should map GET /api/link to getAllLinks controller", async () => {
    const res = await request(app).get("/api/links");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should map GET /api/links/:id to getLinkById controller", async () => {
    const created = await request(app).post("/api/links").send({
      original: "https://example.com",
    });
    const res = await request(app).get(`/api/links/${created.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should return 404 if link id is not found", async () => {
    const res = await request(app).get("/api/links/not-found-id");

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      message: "Link not found",
    });
  });

  it("should map PATCH /api/link/:id to updateLink controller", async () => {
    const created = await request(app).post("/api/links").send({
      original: "https://example.com",
    });
    const res = await request(app)
      .patch(`/api/links/${created.body.id}`)
      .send({ original: "https://example.com/new" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });

  it("should return 400 if original is missing for update", async () => {
    const res = await request(app).patch("/api/links/mock-id").send({
      original: "",
    });

    expect(res.status).toBe(400);
    expect(res.body).toMatchObject({
      errors: [
        {
          code: "invalid_string",
          message: "Invalid url",
          path: ["original"],
          validation: "url",
        },
      ],
      message: "Validation error",
      status: "error",
    });
  });

  it("should map DELETE /api/link/:id to deleteLink controller", async () => {
    const created = await request(app).post("/api/links").send({
      original: "https://example.com",
    });
    const res = await request(app).delete(`/api/links/${created.body.id}`);

    expect(res.status).toBe(204);
  });

  it("should return 404 if link id is not found", async () => {
    const res = await request(app).delete("/api/links/not-found-id");

    expect(res.status).toBe(404);
    expect(res.body).toMatchObject({
      message: "Link not found",
    });
  });
});
