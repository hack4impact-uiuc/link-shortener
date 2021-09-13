import { Button, Popover, Space } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { AliasedLinkType } from "../utils";

interface DeleteButtonProps {
  aliasedLink: AliasedLinkType;
}

export default function DeleteButton(props: DeleteButtonProps) {
  const { aliasedLink } = props;
  const [deletePopover, setDeletePopover] = useState(false);
  const router = useRouter();

  function toggleDeletePopover() {
    setDeletePopover((prevDeletePopover) => !prevDeletePopover);
  }

  async function handleDelete(aliasedLink: AliasedLinkType) {
    // @ts-ignore
    const requestUrl = `/api/links/${aliasedLink._id}`;

    await fetch(requestUrl, {
      method: "DELETE",
    });
    router.replace(router.asPath);
    toggleDeletePopover();
  }

  return (
    <Popover
      trigger="click"
      visible={deletePopover}
      content={
        <>
          <p>Are you sure you want to delete {aliasedLink.name}?</p>
          <Space>
            <Button onClick={toggleDeletePopover}>Cancel</Button>
            <Button
              onClick={() => handleDelete(aliasedLink)}
              type="primary"
              danger
            >
              Delete
            </Button>
          </Space>
        </>
      }
    >
      <Button type="primary" danger onClick={toggleDeletePopover}>
        Delete
      </Button>
    </Popover>
  );
}
