import type { NextApiRequest, NextApiResponse } from "next";
import { AliasedLinkType } from "utils";
import { handleErrorCode, tryCatchWrap } from "utils/api";
import { authWrap } from "utils/auth";
import { AliasedLink } from "utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await authWrap(req, res, async (req, res) => {
    if (req.method === "POST") {
      await tryCatchWrap(req, res, async (req, res) => {
        const { body }: { body: AliasedLinkType } = req;
        const { alias } = body;

        const aliasExists = await AliasedLink.exists({ alias });
        if (aliasExists) {
          handleErrorCode(res, 409);
          return;
        }

        const aliasedLink = await AliasedLink.create(body);
        if (aliasedLink) {
          res.status(201).json(aliasedLink);
        } else {
          handleErrorCode(res, 400);
        }
      });
    } else {
      handleErrorCode(res, 405);
    }
  });
}
