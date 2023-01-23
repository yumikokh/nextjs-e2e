import test, { expect } from "@playwright/test";

test("Hello Worldをレンダーする", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("e2e lesson");
  await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
});
