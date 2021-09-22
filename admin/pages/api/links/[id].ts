import type { NextApiRequest, NextApiResponse } from "next";
import { handleErrorCode, tryCatchWrap } from "utils/api";
import { authWrap } from "utils/auth";
import { AliasedLink } from "utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await authWrap(req, res, async (req, res) => {
    // @ts-ignore
    const methodHandler = methodHandlers[req.method];

    if (methodHandler) {
      await methodHandler(req, res);
    } else {
      handleErrorCode(res, 405);
    }
  });
}

const methodHandlers = {
  GET: getAliasedLink,
  PUT: putAliasedLink,
  DELETE: deleteAliasedLink,
};

async function getAliasedLink(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const aliasedLink = await AliasedLink.find({});

  if (aliasedLink) {
    res.status(200).json(aliasedLink);
  } else {
    handleErrorCode(res, 404);
  }
}

async function putAliasedLink(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await tryCatchWrap(req, res, async (req, res) => {
    const aliasedLink = await AliasedLink.findByIdAndUpdate(
      req.query.id,
      req.body,
      { new: true }
    );

    if (aliasedLink) {
      res.status(200).json(aliasedLink);
    } else {
      handleErrorCode(res, 404);
    }
  });
}

async function deleteAliasedLink(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  await tryCatchWrap(req, res, async (req, res) => {
    const aliasedLink = await AliasedLink.findByIdAndDelete(req.query.id);

    if (aliasedLink) {
      res.status(200).json(aliasedLink);
    } else {
      handleErrorCode(res, 404);
    }
  });
}
