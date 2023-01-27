// クライアントコンポーネントとして定義
// next-authはクライアントで利用するため
"use client";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
