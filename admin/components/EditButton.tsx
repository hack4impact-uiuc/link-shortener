import { useRouter } from "next/router";
import { Form } from "antd";
import AliasedLinkModal from "./AliasedLinkModal";
import { AliasedLinkType } from "utils";

interface EditButtonProps {
  aliasedLink: AliasedLinkType;
}

export default function EditButton(props: EditButtonProps) {
  const { aliasedLink } = props;
  const [form] = Form.useForm();
  const router = useRouter();

  async function handleSubmit() {
    // @ts-ignore
    const requestUrl = `/api/links/${aliasedLink._id}`;

    await fetch(requestUrl, {
      method: "PUT",
      body: JSON.stringify(form.getFieldsValue()),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    router.replace(router.asPath);
  }

  return (
    <AliasedLinkModal
      initialValues={aliasedLink}
      form={form}
      handleSubmit={handleSubmit}
      name="Edit"
    />
  );
}
