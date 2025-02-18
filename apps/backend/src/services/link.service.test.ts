import { describe, it, expect } from "vitest";
import prisma from "@/lib/prisma";
import {
  createLink,
  deleteLink,
  getAllLinks,
  getLinkById,
} from "./link.service";

describe("Link Services", () => {
  it("should create a link", async () => {
    const response = await createLink(
      "https://example.com",
      "http://localhost:3001",
      "session-id"
    );

    expect(response).toMatchObject({
      shortCode: expect.any(String),
      shortUrl: expect.any(String),
      original: "https://example.com",
    });
  });

  it("should get all links", async () => {
    expect(await getAllLinks("session-id")).toMatchObject([]);

    await createLink(
      "https://example.com",
      "http://localhost:3001",
      "session-id"
    );

    expect(await getAllLinks("session-id")).toMatchObject([
      {
        id: expect.any(String),
        shortCode: expect.any(String),
        shortUrl: expect.any(String),
        original: "https://example.com",
      },
    ]);
  });

  it("should get a link by id", async () => {
    const createdLink = await createLink(
      "URL_ADDRESS",
      "URL_ADDRESS",
      "session-id"
    );

    const link = await getLinkById(createdLink.id);

    expect(link).toMatchObject({
      id: createdLink.id,
      shortCode: expect.any(String),
      shortUrl: expect.any(String),
      original: "URL_ADDRESS",
    });
  });

  it("should update a link", async () => {
    const createdLink = await createLink(
      "URL_ADDRESS",
      "URL_ADDRESS",
      "session-id"
    );

    const updatedLink = await prisma.link.update({
      where: { id: createdLink.id },
      data: {
        original: "NEW_URL_ADDRESS",
      },
    });

    expect(updatedLink).toMatchObject({
      id: createdLink.id,
      shortCode: expect.any(String),
      shortUrl: expect.any(String),
      original: "NEW_URL_ADDRESS",
    });
  });

  it("should delete a link", async () => {
    const createdLink = await createLink(
      "URL_ADDRESS",
      "URL_ADDRESS",
      "session-id"
    );

    await deleteLink(createdLink.id);

    expect(await getAllLinks("session-id")).toMatchObject([]);
  });
});
