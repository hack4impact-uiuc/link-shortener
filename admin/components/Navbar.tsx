import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Layout, Space } from "antd";

const { Header } = Layout;

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <Header className="row-center-space-between">
      <h1 id="title">Link Shortener Admin</h1>
      {session ? (
        <Space>
          <span>Signed in as {session.user?.email}</span>
          <Button ghost onClick={() => signOut()}>
            Sign Out
          </Button>
        </Space>
      ) : (
        <Button ghost onClick={() => signIn()}>
          Sign In
        </Button>
      )}
    </Header>
  );
}
