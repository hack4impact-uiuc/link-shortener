import { useContext } from "react";
import { useRouter } from "next/router";
import { Form } from "antd";
import AliasedLinkModal from "./AliasedLinkModal";
import { AliasedLinkType } from "utils";
import { updateAliasedLink } from "utils/api";
import Context from "utils/context";

interface EditButtonProps {
  aliasedLink: AliasedLinkType;
}

export default function EditButton(props: EditButtonProps) {
  const { aliasedLink } = props;
  const { setError } = useContext(Context);
  const router = useRouter();

  const [form] = Form.useForm<AliasedLinkType>();

  async function handleSubmit() {
    // @ts-ignore
    const aliasedLinkId = aliasedLink._id;
    const res = await updateAliasedLink(
      aliasedLinkId,
      form.getFieldsValue(),
      setError
    );

    if (res) {
      router.replace(router.asPath);
    }
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
