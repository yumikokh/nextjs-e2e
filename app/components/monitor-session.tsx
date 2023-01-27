"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function MonitorSession() {
  const router = useRouter();
  // 現在ログインしているユーザーのセッション情報を取得
  const { data: session } = useSession();
  useEffect(() => {
    // 新しいユーザーに対応したユーザーを取得するため
    // サーバーコンポーネントを再度実行
    router.refresh();
  }, [session]);
  return null;
}
