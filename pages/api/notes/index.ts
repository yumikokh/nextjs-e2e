import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { getNotes } from "../../../lib/prisma/notes";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // サーバー側（ex. Vercel）のsessionを取得
  const session = await unstable_getServerSession(req, res, authOptions);
  if (req.method === "GET") {
    if (!session) {
      return res.status(401).json({
        error: "You must sign in to access this endpoint",
      });
    }
    try {
      const { notes, error } = await getNotes();
      if (error) throw new Error(error);
      return res.status(200).json(notes);
    } catch (e: any) {
      return res.status(500).json({ error: e.message });
    }
  }
  // 405を返答する場合に使用することができるリクエストメソッドを示す
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
