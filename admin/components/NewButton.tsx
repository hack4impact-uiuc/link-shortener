import { ReactElement, useContext } from "react";
import { useRouter } from "next/router";
import { Form } from "antd";
import AliasedLinkModal from "./AliasedLinkModal";
import { AliasedLinkType } from "utils";
import { createAliasedLink } from "utils/api";
import Context from "utils/context";

interface NewButtonProps {
  order: number;
}

export default function NewButton(props: NewButtonProps): ReactElement {
  const { order } = props;
  const { setError } = useContext(Context);
  const router = useRouter();
  const [form] = Form.useForm<AliasedLinkType>();

  async function handleSubmit(): Promise<boolean> {
    const res = await createAliasedLink(
      { ...form.getFieldsValue(), order },
      setError
    );

    if (res) {
      form.resetFields();
      router.replace(router.asPath);
      return true;
    }

    return false;
  }

  return (
    <AliasedLinkModal
      form={form}
      handleSubmit={handleSubmit}
      name="Add aliased link"
      initialValues={{ public: false }}
    />
  );
}
