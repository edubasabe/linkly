import { test, expect } from "@playwright/test";
import { config } from "dotenv";

config({
  path: ".env.test",
});

const APP_URL = process.env.APP_URL as string;

test("page loads", async ({ page }) => {
  await page.goto(APP_URL);
  await expect(page).toHaveTitle(/Linkly/);
});

test("creates a link", async ({ page }) => {
  await page.goto(APP_URL);
  await page
    .getByRole("textbox", { name: "Long URL" })
    .fill("https://fast.com");
  await page.getByRole("button", { name: "Shorten URL ✨" }).click();

  expect(page.getByText("Your shortened URL:"));
});

test("updates a link", async ({ page }) => {
  // Create a link
  await page.goto(APP_URL);
  await page
    .getByRole("textbox", { name: "Long URL" })
    .fill("https://fast.com");
  await page.getByRole("button", { name: "Shorten URL ✨" }).click();
  expect(page.getByText("Your shortened URL:"));

  // Go to Your Links tab
  await page.getByRole("tab", { name: "Your Links" }).click();
  expect(page.getByRole("cell", { name: "https://fast.com" }));

  // Edit the link
  await page.getByRole("button", { name: "Edit link" }).click();
  await page
    .getByRole("textbox", { name: "Enter a Link" })
    .fill("https://as.com");
  await page.getByRole("button", { name: "Save" }).click();

  // Check if the link is updated
  expect(page.getByRole("cell", { name: "https://as.com" }));
});

test("deletes a link", async ({ page }) => {
  // Create a link
  await page.goto(APP_URL);
  await page
    .getByRole("textbox", { name: "Long URL" })
    .fill("https://fast.com");
  await page.getByRole("button", { name: "Shorten URL ✨" }).click();
  expect(page.getByText("Your shortened URL:"));

  // Go to Your Links tab
  await page.getByRole("tab", { name: "Your Links" }).click();
  // Check if the link is listed
  expect(page.getByRole("cell", { name: "https://fast.com" }));

  // Deletes the created link
  await page.getByRole("button", { name: "Delete link" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();

  // Check if the link is deleted
  expect(page.getByText("You haven't shortened any"));
});

test("copies a link", async ({ page }) => {
  // Create a link
  await page.goto(APP_URL);
  await page
    .getByRole("textbox", { name: "Long URL" })
    .fill("https://fast.com");
  await page.getByRole("button", { name: "Shorten URL ✨" }).click();
  expect(page.getByText("Your shortened URL:"));

  // Copy the link
  await page.getByRole("button", { name: "Copy to Clipboard 📋" }).click();

  // Check if the link is copied
  expect(page.getByText("Copied! 🎉"));
});

test("opens the link in a new tab", async ({ page, context }) => {
  // Create a link
  await page.goto(APP_URL);
  await page
    .getByRole("textbox", { name: "Long URL" })
    .fill("https://fast.com");
  await page.getByRole("button", { name: "Shorten URL ✨" }).click();
  expect(page.getByText("Your shortened URL:"));

  // Open the link in a new tab
  const [newPage] = await Promise.all([
    context.waitForEvent("page"), // Wait for a new page to be created
    page.getByRole("link", { name: "http://", exact: false }).click(), // Click the link
  ]);

  const url = newPage.url();
  console.log(`New tab navigated to: ${url}`);

  // Check if the link is opened in a new tab
  expect(url).toContain("https://fast.com");
});
