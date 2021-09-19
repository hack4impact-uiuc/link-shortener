import { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Space, Switch } from "antd";
import { AliasedLinkTable, NewButton } from "components";
import { AliasedLinkType } from "utils";
import Context from "utils/context";
import { AliasedLink, mongoConnect } from "utils/mongo";

interface HomeProps {
  aliasedLinks: AliasedLinkType[];
  status: "Unauthenticated" | "Unauthorized" | "Authorized";
}

export default function Home(props: HomeProps) {
  const { aliasedLinks, status } = props;
  const [orderChangingEnabled, setOrderChangingEnabled] = useState(false);

  switch (status) {
    case "Authorized": {
      return (
        <>
          <div className="row-center-space-between">
            <h2>Aliased links</h2>
            <Space>
              <Switch
                checkedChildren="Order changing enabled"
                unCheckedChildren="Order changing disabled"
                onChange={setOrderChangingEnabled}
              />
              <NewButton order={aliasedLinks.length + 1} />
            </Space>
          </div>
          <div id="table-container">
            <AliasedLinkTable
              aliasedLinks={aliasedLinks}
              orderChangingEnabled={orderChangingEnabled}
            />
          </div>
        </>
      );
    }
    case "Unauthorized": {
      return <h2>You are not authorized to access this page.</h2>;
    }
    case "Unauthenticated": {
      return <h2>Sign in to access this page.</h2>;
    }
  }
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const session = await getSession(context);
  switch (session?.user?.email) {
    case process.env.ADMIN_EMAIL: {
      await mongoConnect();

      const aliasedLinks = await AliasedLink.find().sort({ order: 1 }).lean();
      // @ts-ignore
      aliasedLinks.forEach((link) => (link._id = link._id.toString()));

      return {
        props: {
          aliasedLinks,
          status: "Authorized",
        },
      };
    }
    case undefined: {
      return {
        props: {
          aliasedLinks: [],
          status: "Unauthenticated",
        },
      };
    }
    default: {
      return {
        props: {
          aliasedLinks: [],
          status: "Unauthorized",
        },
      };
    }
  }
};
