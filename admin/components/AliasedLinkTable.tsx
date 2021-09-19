import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Space, Table } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import DeleteButton from "./DeleteButton";
import DraggableBodyRow from "./DraggableBodyRow";
import EditButton from "./EditButton";
import { AliasedLinkType, compareStrings } from "utils";

const { Column } = Table;

interface AliasedLinkTableProps {
  aliasedLinks: AliasedLinkType[];
  orderChangingEnabled: boolean;
}

export default function AliasedLinkTable(props: AliasedLinkTableProps) {
  const { aliasedLinks, orderChangingEnabled } = props;
  const [orderedLinks, setOrderedLinks] = useState(aliasedLinks);
  const [orderModified, setOrderModified] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setOrderedLinks(aliasedLinks);
  }, [aliasedLinks]);

  useEffect(() => {
    if (orderModified) {
      async function updateLinkOrders() {
        const orderedIds = orderedLinks.map((aliasedLink, index) => ({
          _id: (aliasedLink as any)._id,
          order: index,
        }));

        await fetch("/api/links/order", {
          method: "PUT",
          body: JSON.stringify(orderedIds),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setOrderModified(false);

        router.replace(router.asPath);
      }
      updateLinkOrders();
    }
  }, [orderedLinks, orderModified, router]);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = orderedLinks[dragIndex];
      setOrderedLinks(
        update(orderedLinks, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        })
      );

      setOrderModified(true);
    },
    [orderedLinks]
  );

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        dataSource={orderedLinks}
        rowKey={(aliasedLink: AliasedLinkType) => aliasedLink.alias}
        components={orderChangingEnabled ? components : undefined}
        pagination={{ hideOnSinglePage: true, defaultPageSize: 20 }}
        onRow={(_, index) =>
          ({
            index,
            moveRow,
          } as any)
        }
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
          key="visibility"
          render={(isPublic) => (isPublic ? "Public" : "Private")}
          filters={[
            { text: "Public", value: true },
            { text: "Private", value: false },
          ]}
          onFilter={
            ((value: boolean, aliasedLink: AliasedLinkType) =>
              aliasedLink.public === value) as any
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
    </DndProvider>
  );
}
