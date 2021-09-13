import { Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { AliasedLinkType } from "../utils";

const { Column } = Table;

interface AliasedLinkTableProps {
  aliasedLinks: AliasedLinkType[];
}

function compareStrings(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  return a < b ? -1 : 1;
}

export default function AliasedLinkTable(props: AliasedLinkTableProps) {
  const { aliasedLinks } = props;

  return (
    <Table
      dataSource={aliasedLinks}
      rowKey={(aliasedLink: AliasedLinkType) => aliasedLink.alias}
      pagination={{ hideOnSinglePage: true }}
    >
      <Column
        title="Name"
        dataIndex="name"
        key="name"
        sorter={(a: AliasedLinkType, b: AliasedLinkType) =>
          compareStrings(a.name, b.name)
        }
      />
      <Column
        title="Alias"
        dataIndex="alias"
        key="alias"
        sorter={(a: AliasedLinkType, b: AliasedLinkType) =>
          compareStrings(a.alias, b.alias)
        }
      />
      <Column
        title="Destination"
        dataIndex="destination"
        key="destination"
        render={(destination) => (
          <a href={destination} target="_blank" rel="noopener noreferrer">
            {destination}
          </a>
        )}
        sorter={(a: AliasedLinkType, b: AliasedLinkType) =>
          compareStrings(a.destination, b.destination)
        }
      />
      <Column
        title="Visibility"
        dataIndex="public"
        key="public"
        render={(isPublic) => (isPublic ? "Public" : "Private")}
        filters={[
          { text: "Public", value: true },
          { text: "Private", value: false },
        ]}
        onFilter={(value, aliasedLink: AliasedLinkType) =>
          aliasedLink.public === value
        }
      />
      <Column
        title="Actions"
        key="actions"
        render={(_, aliasedLink: AliasedLinkType) => (
          <Space>
            <EditButton aliasedLink={aliasedLink} />
            <DeleteButton aliasedLink={aliasedLink} />
          </Space>
        )}
      />
    </Table>
  );
}
