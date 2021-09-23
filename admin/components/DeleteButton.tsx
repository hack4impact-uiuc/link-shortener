import { ReactElement, useContext, useState } from "react";
import { Button, Popover, Space } from "antd";
import { useRouter } from "next/router";
import { AliasedLinkType } from "utils";
import { deleteAliasedLink } from "utils/api";
import Context from "utils/context";

interface DeleteButtonProps {
  aliasedLink: AliasedLinkType;
}

export default function DeleteButton(props: DeleteButtonProps): ReactElement {
  const { aliasedLink } = props;
  const [deletePopover, setDeletePopover] = useState(false);
  const { setError } = useContext(Context);
  const router = useRouter();

  function toggleDeletePopover(): void {
    setDeletePopover((prevDeletePopover) => !prevDeletePopover);
  }

  async function handleDelete(aliasedLink: AliasedLinkType): Promise<void> {
    // @ts-ignore
    const aliasedLinkId = aliasedLink._id;
    const res = await deleteAliasedLink(aliasedLinkId, setError);

    if (res) {
      router.replace(router.asPath);
      toggleDeletePopover();
    }
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
