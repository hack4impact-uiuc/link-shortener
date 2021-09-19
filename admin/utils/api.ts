import { AliasedLinkType, OrderedIdsType, SetErrorType } from ".";

const STATUS_MAP: Record<number, string> = {
  400: "Bad request body - please provide all required fields.",
  401: "You must be signed in to access this resource.",
  403: "You do not have the sufficient permission to access this resource.",
  404: "This resource does not exist.",
  405: "The request method is not permitted on this resource.",
  500: "Server error - please file an issue.",
};

export async function wrapResponse<T>(
  response: Response,
  setError: SetErrorType
): Promise<T | undefined> {
  if (response.ok) {
    return response.json();
  }

  const { status } = response;
  const error =
    STATUS_MAP[status] ??
    `Unexpected error code ${status} - please file an issue with this status code.`;

  setError(error);
  return undefined;
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
