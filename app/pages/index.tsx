import type { NextPage } from "next";
import { AliasedLink, mongoConnect, AliasedLinkType } from "../utils";

interface HomeProps {
  aliasedLinks: AliasedLinkType[];
}

const Home: NextPage<HomeProps> = (props: HomeProps) => {
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
};

export default Home;

export const getServerSideProps = async function () {
  await mongoConnect();

  const aliasedLinks = await AliasedLink.find({ public: true })
    .sort({ name: 1 })
    .lean();
  // @ts-ignore
  aliasedLinks.forEach((link) => delete link._id);

  return {
    props: {
      aliasedLinks,
    },
  };
};
