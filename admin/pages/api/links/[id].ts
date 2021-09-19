import type { NextApiRequest, NextApiResponse } from "next";
import { AliasedLink } from "utils/mongo";
import { authWrap } from "utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authWrap(req, res, async (req, res) => {
    // @ts-ignore
    const methodHandler = methodHandlers[req.method];

    if (methodHandler) {
      await methodHandler(req, res);
    } else {
      res.status(405);
    }
  });
}

const methodHandlers = {
  GET: getAliasedLink,
  PUT: putAliasedLink,
  DELETE: deleteAliasedLink,
};

async function getAliasedLink(_: NextApiRequest, res: NextApiResponse) {
  const aliasedLink = await AliasedLink.find({});

  if (aliasedLink) {
    res.status(200).json(aliasedLink);
  } else {
    res.status(404);
  }
}

async function putAliasedLink(req: NextApiRequest, res: NextApiResponse) {
  try {
    const aliasedLink = await AliasedLink.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );

    if (aliasedLink) {
      res.status(200).json(aliasedLink);
    } else {
      res.status(404);
    }
  } catch {
    res.status(400);
  }
}

async function deleteAliasedLink(req: NextApiRequest, res: NextApiResponse) {
  try {
    const aliasedLink = await AliasedLink.findByIdAndDelete(req.query.id);

    if (aliasedLink) {
      res.status(200).json(aliasedLink);
    } else {
      res.status(404);
    }
  } catch {
    res.status(400);
  }
}
