import {
  ChangeEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Input, Space, Switch } from "antd";
import { AliasedLinkTable, NewButton } from "components";
import { AliasedLinkType } from "utils";
import Context from "utils/context";
import { AliasedLink, mongoConnect } from "utils/mongo";

const { Search } = Input;

interface HomeProps {
  aliasedLinks: AliasedLinkType[];
  status: "Unauthenticated" | "Unauthorized" | "Authorized";
  error?: string;
}

export default function Home(props: HomeProps): ReactElement {
  const { aliasedLinks, error, status } = props;
  const [search, setSearch] = useState("");
  const [orderChangingEnabled, setOrderChangingEnabled] = useState(false);
  const { setError } = useContext(Context);

  useEffect(() => {
    if (error !== undefined) {
      setError(error);
    }
  }, [error, setError]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearch(e.target.value);
  }

  function searchFilter(aliasedLink: AliasedLinkType): boolean {
    const { alias, destination, name } = aliasedLink;
    return (
      alias.includes(search) ||
      destination.includes(search) ||
      name.includes(search)
    );
  }

  switch (status) {
    case "Authorized": {
      return (
        <>
          <div className="row-center-space-between table-toolbar">
            <Space>
              <h2>Aliased links</h2>
            </Space>
            <Space>
              <Search
                onChange={handleSearchChange}
                onSearch={setSearch}
                enterButton
                allowClear
              />
            </Space>
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
              aliasedLinks={aliasedLinks.filter(searchFilter)}
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
      try {
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
      } catch {
        return {
          props: {
            aliasedLinks: [],
            status: "Authorized",
            error: "Server error - please file an issue.",
          },
        };
      }
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
