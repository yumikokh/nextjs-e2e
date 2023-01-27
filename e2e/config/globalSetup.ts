// テストを開始する前に実行したい処理を書く

import { chromium } from "@playwright/test";
import path from "path";
import prisma from "../../lib/prisma";

// テストが行われる前に1回実行される処理
export default async function globalConfig() {
  const storagePath = path.resolve(__dirname, "storageState.json");
  const date = new Date();
  const sessionToken = "9468389e-ff19-4eb4-bf73-b56516e9b7e8";

  // upsert -> 存在しない場合は新規作成、存在する場合はアップデート
  await prisma.user.upsert({
    where: {
      // 存在する？
      email: "udemy@test.com",
    },
    // 存在しないときの処理
    create: {
      name: "userA",
      email: "udemy@test.com",
      sessions: {
        create: {
          expires: new Date(
            date.getFullYear(),
            date.getMonth() + 6,
            date.getDate()
          ),
          sessionToken,
        },
      },
      accounts: {
        create: {
          type: "oauth",
          provider: "github",
          providerAccountId: "1234567",
          access_token: "Q3v00dCoWcdzmxpGeiPG2I3wDgsJypSP",
          token_type: "bearer",
          scope: "read:user,user:email",
        },
      },
    },
    // 存在するときは何もしない
    update: {},
  });

  // storageState.jsonにsessionを書き出す処理
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: "next-auth.session-token",
      value: sessionToken,
      domain: "localhost",
      path: "/",
      httpOnly: true,
      sameSite: "Lax",
      expires: Math.round((Date.now() + 86400000 * 1) / 1000), // 1日
    },
  ]);
  // storageState.jsonに書き出す
  await context.storageState({ path: storagePath });
  await browser.close();
}
