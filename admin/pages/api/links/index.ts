import type { NextApiRequest, NextApiResponse } from "next";
import { AliasedLinkType } from "utils";
import { authWrap } from "utils/auth";
import { AliasedLink } from "utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await authWrap(req, res, async (req, res) => {
    if (req.method === "GET") {
      try {
        const { body }: { body: AliasedLinkType } = req.body;
        const { alias } = body;

        const aliasExists = await AliasedLink.exists({ alias });
        if (aliasExists) {
          res.status(409);
          return;
        }

        const aliasedLink = await AliasedLink.create(body);
        if (aliasedLink) {
          res.status(201).json(aliasedLink);
        } else {
          res.status(400);
        }
      } catch {
        res.status(400);
      }
    } else {
      res.status(405);
    }
  });
}
