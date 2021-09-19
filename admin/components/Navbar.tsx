import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Layout, Space } from "antd";
import { ReactElement } from "react";

const { Header } = Layout;

export default function NavBar(): ReactElement {
  const { data: session } = useSession();

  return (
    <Header className="row-center-space-between">
      <h1 id="title">Link Shortener Admin</h1>
      {session ? (
        <Space>
          <span>Signed in as {session.user?.email}</span>
          <Button ghost onClick={signOut as any}>
            Sign Out
          </Button>
        </Space>
      ) : (
        <Button ghost onClick={signIn as any}>
          Sign In
        </Button>
      )}
    </Header>
  );
}
