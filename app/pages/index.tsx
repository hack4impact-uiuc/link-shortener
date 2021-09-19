import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { AliasedLink, mongoConnect, AliasedLinkType } from "../utils";

interface HomeProps {
  aliasedLinks: AliasedLinkType[];
}

export default function Home(props: HomeProps): ReactElement {
  const { aliasedLinks } = props;
  return (
    <>
      <section id="banner" className="column-center">
        <h1>Hack4Impact UIUC</h1>
        <h2>Link Shortener</h2>
      </section>
      <section id="contents" className="row-center">
        <ul id="redirects">
          {aliasedLinks.map((link) => (
            <li key={link.alias}>
              <a
                href={link.destination}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
                <i className="link-icon" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async function () {
  await mongoConnect();

  const aliasedLinks = await AliasedLink.find({ public: true })
    .sort({ order: 1 })
    .lean();
  // @ts-ignore
  aliasedLinks.forEach((link) => delete link._id);

  return {
    props: {
      aliasedLinks,
    },
  };
};
