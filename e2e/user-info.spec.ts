import test, { expect } from "@playwright/test";

test("Shall github username not visible without session token", async ({
  page,
  context,
}) => {
  await context.clearCookies(); // テスト用のcookieを削除
  await page.goto("/");
  await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
  await expect(page.getByText("userA")).not.toBeVisible();
});

test("Shall github username visible without session token", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading")).toHaveText("Hello World🚀");
  await expect(page.getByText("userA")).toBeVisible();
});
