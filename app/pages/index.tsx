import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { AliasedLinkCard } from "components";
import { AliasedLink, mongoConnect, AliasedLinkType } from "utils";

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
          {aliasedLinks.map((aliasedLink) => (
            <AliasedLinkCard
              key={aliasedLink.alias}
              aliasedLink={aliasedLink}
            />
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
