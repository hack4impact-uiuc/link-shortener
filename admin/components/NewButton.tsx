import { useRouter } from "next/router";
import { Form } from "antd";
import AliasedLinkModal from "./AliasedLinkModal";
import { AliasedLinkType } from "../utils";

interface NewButtonProps {
  order: number;
}

export default function NewButton(props: NewButtonProps) {
  const { order } = props;
  const [form] = Form.useForm<AliasedLinkType>();
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch("/api/links", {
      method: "POST",
      body: JSON.stringify({ ...form.getFieldsValue(), order }),
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
      initialValues={{ public: false }}
    />
  );
}
