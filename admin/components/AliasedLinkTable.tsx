import { useState, useCallback, useRef } from "react";
import { Space, Table } from "antd";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { AliasedLinkType } from "../utils";

const { Column } = Table;

function DraggableBodyRow({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: any) {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: "DraggableBodyRow",
    collect: (monitor) => {
      const { index: dragIndex } = (monitor.getItem() as any) || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item: any) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type: "DraggableBodyRow",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
}

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
