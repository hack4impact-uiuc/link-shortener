import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { handleErrorCode } from "utils/api";
import { mongoConnect } from "utils/mongo";

/**
 * A wrapper for the standard authentication workflow.
 * If the user is the admin user, proceeds with the provided callback.
 * If the user is authenticated but not the admin user, returns a 403 Forbidden code.
 * If the user is not authenticated, returns a 401 Unauthorized code.
 */
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
      break;
    }

    case undefined: {
      handleErrorCode(res, 401);
      break;
    }

    default: {
      handleErrorCode(res, 403);
    }
  }
}
