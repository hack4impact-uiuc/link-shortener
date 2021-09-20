import { ReactElement, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Modal,
  Tooltip,
} from "antd";
import { AliasedLinkType } from "utils";

interface AliasedLinkModalProps {
  initialValues?: Partial<AliasedLinkType>;
  form: FormInstance;
  handleSubmit: () => Promise<void>;
  name: string;
}

/**
 * A modular modal for filling in AliasedLink fields.
 */
export default function AliasedLinkModal(
  props: AliasedLinkModalProps
): ReactElement {
  const { initialValues, form, handleSubmit, name } = props;
  const [modal, setModal] = useState(false);

  function toggleModal(): void {
    setModal((prevModal) => !prevModal);
  }

  async function onOk(): Promise<void> {
    await handleSubmit();
    toggleModal();
  }

  function handleCancel(): void {
    form.resetFields();
    toggleModal();
  }

  return (
    <>
      <Button type="primary" onClick={toggleModal}>
        {name}
      </Button>
      <Modal
        visible={modal}
        onOk={onOk}
        onCancel={handleCancel}
        closable={false}
        okText="Save"
      >
        <Form initialValues={initialValues} form={form}>
          <Tooltip
            title="This is used to identify the aliased link on h4i.app's interface."
            placement="left"
          >
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip
            title="The is the suffix of the shortened form of the aliased link."
            placement="left"
          >
            <Form.Item label="Alias" name="alias" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip
            title="This is where the aliased link leads to."
            placement="left"
          >
            <Form.Item
              label="Destination"
              name="destination"
              rules={[{ required: true, type: "url" }]}
            >
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip
            title="This sets whether or not the aliased link will be visible on h4i.app's interface."
            placement="left"
          >
            <Form.Item
              label="Public"
              name="public"
              rules={[{ required: true }]}
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Tooltip>
        </Form>
      </Modal>
    </>
  );
}
