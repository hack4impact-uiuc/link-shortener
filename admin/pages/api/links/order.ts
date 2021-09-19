import type { NextApiRequest, NextApiResponse } from "next";
import { AliasedLink } from "utils/mongo";
import { authWrap } from "utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await authWrap(req, res, async (req, res) => {
    if (req.method === "PUT") {
      const orderedIds: Array<{ _id: string; order: number }> = req.body;

      try {
        const orderedLinks = await Promise.all(
          orderedIds.map(({ _id, order }) =>
            AliasedLink.findByIdAndUpdate(_id, { order }, { new: true })
          )
        );

        res.status(200).json(orderedLinks);
      } catch {
        res.status(400);
      }
    }
  });
}
