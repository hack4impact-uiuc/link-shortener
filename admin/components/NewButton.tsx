import { useRouter } from "next/router";
import { Form } from "antd";
import AliasedLinkModal from "./AliasedLinkModal";

export default function NewButton() {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify(form.getFieldsValue()),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    form.resetFields();

    router.replace(router.asPath);
  };

  return (
    <AliasedLinkModal
      form={form}
      handleSubmit={handleSubmit}
      name="Add aliased link"
    />
  );
}
