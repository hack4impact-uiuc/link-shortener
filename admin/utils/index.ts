import { Dispatch, SetStateAction } from "react";

export interface AliasedLinkType {
  alias: string;
  destination: string;
  name: string;
  order: number;
  public: boolean;
}

/**
 * A simple helper to lexicographically sort strings.
 */
export function compareStrings(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

export type OrderedIdsType = Array<{ _id: string; order: number }>;

export type SetErrorType = Dispatch<SetStateAction<string | undefined>>;
