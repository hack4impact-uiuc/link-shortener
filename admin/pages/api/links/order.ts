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

      if (req.method === "PUT") {
        const orderedIds: Array<{ _id: string; order: number }> = req.body;

        const orderedLinks = await Promise.all(
          orderedIds.map(({ _id, order }) =>
            AliasedLink.findByIdAndUpdate(_id, { order }, { new: true })
          )
        );

        res.status(200).json(orderedLinks);
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
