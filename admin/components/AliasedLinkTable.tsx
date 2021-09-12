import { Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { AliasedLinkType } from "link-shortener-common";

interface AliasedLinkTableProps {
  aliasedLinks: AliasedLinkType[];
}

export default function AliasedLinkTable(props: AliasedLinkTableProps) {
  const { aliasedLinks } = props;

  const columns: ColumnsType<AliasedLinkType> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Alias", dataIndex: "alias", key: "alias" },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
      render: (destination) => (
        <a href={destination} target="_blank" rel="noopener noreferrer">
          {destination}
        </a>
      ),
    },
    {
      title: "Visibility",
      dataIndex: "public",
      key: "public",
      render: (isPublic) => (isPublic ? "Public" : "Private"),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, aliasedLink) => (
        <Space>
          <EditButton aliasedLink={aliasedLink} />
          <DeleteButton aliasedLink={aliasedLink} />
        </Space>
      ),
    },
  ];

  return <Table dataSource={aliasedLinks} columns={columns} />;
}
