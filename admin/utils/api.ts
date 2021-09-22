import { NextApiRequest, NextApiResponse } from "next";
import { AliasedLinkType, OrderedIdsType, SetErrorType } from "utils";

/**
 * A map from server-generated error codes to custom error messages.
 */
const STATUS_MAP = {
  400: "Bad request body - please ensure you have provided all required fields.",
  401: "You must be signed in to access this resource.",
  403: "You do not have the sufficient permission to access this resource.",
  404: "The link with this id does not exist.",
  405: "The request method is not permitted on this resource.",
  409: "Cannot create link with a duplicate alias.",
  500: "Server error - please file an issue.",
};

type Status = keyof typeof STATUS_MAP;

/**
 * Wraps an API handler, attempting to forward an error if caught.
 */
export async function tryCatchWrap(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
): Promise<void> {
  try {
    await callback(req, res);
  } catch (error) {
    const message = (error as any).message ?? STATUS_MAP[400];

    res.status(400).json({ message });
  }
}

/**
 * Sets the response's status code as specified, and sends the respective message from STATUS_MAP.
 */
export function handleErrorCode(res: NextApiResponse, code: Status): void {
  res.status(code).json({ message: STATUS_MAP[code] });
}

/**
 * Wraps a fetch call to the API, hooking in to setError if needed.
 */
export async function wrapResponse<T>(
  response: Response,
  setError: SetErrorType
): Promise<T | undefined> {
  if (response.ok) {
    return response.json();
  }

  const { status } = response;
  const body = await response.json();

  const error = getError(body, status);

  setError(error);
  return undefined;
}

/**
 * Fetches an error message from the response body, or generates one from the status code if possible.
 */
function getError(body: any, status: number): string {
  const { message } = body;
  if (message !== undefined) {
    return message;
  }

  return status in STATUS_MAP
    ? STATUS_MAP[status as Status]
    : `Unexpected error code ${status} - please file an issue with this status code.`;
}

export async function createAliasedLink(
  aliasedLink: AliasedLinkType,
  setError: SetErrorType
): Promise<AliasedLinkType | undefined> {
  const res = await fetch("/api/links", {
    method: "POST",
    body: JSON.stringify(aliasedLink),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return wrapResponse(res, setError);
}

export async function updateAliasedLink(
  _id: string,
  update: Partial<AliasedLinkType>,
  setError: SetErrorType
): Promise<AliasedLinkType | undefined> {
  const res = await fetch(`/api/links/${_id}`, {
    method: "PUT",
    body: JSON.stringify(update),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return wrapResponse(res, setError);
}

export async function deleteAliasedLink(
  _id: string,
  setError: SetErrorType
): Promise<AliasedLinkType | undefined> {
  const res = await fetch(`/api/links/${_id}`, {
    method: "DELETE",
  });

  return wrapResponse(res, setError);
}

export async function updateLinkOrders(
  orderedIds: OrderedIdsType,
  setError: SetErrorType
): Promise<OrderedIdsType | undefined> {
  const res = await fetch("/api/links/order", {
    method: "PUT",
    body: JSON.stringify(orderedIds),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return wrapResponse(res, setError);
}
