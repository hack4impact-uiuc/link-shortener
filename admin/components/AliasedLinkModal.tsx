import { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  FormInstance,
  Input,
  Modal,
  Tooltip,
} from "antd";
import { AliasedLinkType } from "link-shortener-common";

interface AliasedLinkModalProps {
  initialValues?: AliasedLinkType;
  form: FormInstance;
  handleSubmit: () => Promise<void>;
  name: string;
}

export default function AliasedLinkModal(props: AliasedLinkModalProps) {
  const { initialValues, form, handleSubmit, name } = props;
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal((prevModal) => !prevModal);
  const handleCancel = () => {
    form.resetFields();
    toggleModal();
  };

  return (
    <>
      <Button type="primary" onClick={toggleModal}>
        {name}
      </Button>
      <Modal
        visible={modal}
        onOk={() => handleSubmit().then(() => toggleModal())}
        onCancel={handleCancel}
        closable={false}
        okText="Save"
      >
        <Form initialValues={initialValues} form={form}>
          <Tooltip title="This is used to identify the aliased link on h4i.app's interface.">
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip title="The is the suffix of the shortened form of the aliased link.">
            <Form.Item label="Alias" name="alias" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip title="This is where the aliased link leads to.">
            <Form.Item
              label="Destination"
              name="destination"
              rules={[{ required: true, type: "url" }]}
            >
              <Input />
            </Form.Item>
          </Tooltip>
          <Tooltip title="This sets whether or not the aliased link will be visible on h4i.app's interface.">
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