import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { AliasedLink, mongoConnect } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  switch (session?.user?.email) {
    case process.env.ADMIN_EMAIL: {
      await mongoConnect();

      if (req.method === "POST") {
        const aliasedLink = await AliasedLink.create(req.body);
        if (aliasedLink) {
          res.status(201).json(aliasedLink);
        } else {
          res.status(400);
        }
      } else {
        res.status(405);
      }
    }

    case undefined: {
      res.status(401);
    }

    default: {
      res.status(403);
    }
  }
}
