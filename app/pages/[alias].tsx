import { GetServerSideProps } from "next";
import { AliasedLink, mongoConnect } from "utils";

export default function Alias(): null {
  return null;
}

interface Params {
  alias: string;
}

export const getServerSideProps: GetServerSideProps = async function ({
  params,
}: {
  params: Params;
}) {
  await mongoConnect();

  const { alias } = params;

  const aliasedLink = await AliasedLink.findOneAndUpdate(
    { alias },
    { $inc: { hits: 1 } }
  );

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
} as any;
