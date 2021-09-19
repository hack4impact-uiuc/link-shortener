import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { mongoConnect } from "utils/mongo";

export async function authWrap(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
): Promise<void> {
  const session = await getSession({ req });
  switch (session?.user?.email) {
    case process.env.ADMIN_EMAIL: {
      await mongoConnect();
      await callback(req, res);
    }

    case undefined: {
      res.status(401);
    }

    default: {
      res.status(403);
    }
  }
}
