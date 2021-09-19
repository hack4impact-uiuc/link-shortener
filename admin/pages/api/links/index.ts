import type { NextApiRequest, NextApiResponse } from "next";
import { AliasedLink } from "utils/mongo";
import { authWrap } from "utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authWrap(req, res, async (req, res) => {
    try {
      const aliasedLink = await AliasedLink.create(req.body);
      if (aliasedLink) {
        res.status(201).json(aliasedLink);
      } else {
        res.status(400);
      }
    } catch {
      res.status(400);
    }
  });
}
