import { ReactElement } from "react";
import { AliasedLinkType } from "../utils";

interface AliasedLinkCardProps {
  aliasedLink: AliasedLinkType;
}

export default function AliasedLinkCard(
  props: AliasedLinkCardProps
): ReactElement {
  const { aliasedLink } = props;
  const { alias, destination, name } = aliasedLink;

  return (
    <li key={alias}>
      <a href={destination} target="_blank" rel="noopener noreferrer">
        {name}
        <i className="link-icon" />
      </a>
    </li>
  );
}
