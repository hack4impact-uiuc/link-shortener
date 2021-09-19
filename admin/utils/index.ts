export interface AliasedLinkType {
  alias: string;
  destination: string;
  name: string;
  order: number;
  public: boolean;
}

export function compareStrings(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}
