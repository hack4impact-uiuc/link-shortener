import { AliasedLink, mongoConnect } from "link-shortener-common";

export default function Alias() {
  return null;
}

interface Params {
  alias: string;
}

export const getServerSideProps = async function ({
  params,
}: {
  params: Params;
}) {
  await mongoConnect();

  const { alias } = params;

  const aliasedLink = await AliasedLink.findOne({ alias });

  if (aliasedLink) {
    const { destination } = aliasedLink;

    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  return { notFound: true };
};
