import { ReactElement, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { Layout, notification } from "antd";
import { Navbar } from "components";
import Context from "utils/context";
import "antd/dist/antd.css";
import "../styles/globals.css";

const { Content } = Layout;

function MyApp(props: AppProps): ReactElement {
  const { Component, pageProps } = props;
  const [error, setError] = useState<string | undefined>(undefined);

  /**
   * Display a notification with the current error message, or clear the notification if no error.
   */
  useEffect(() => {
    if (error !== undefined) {
      notification.error({
        message: "Error",
        description: error,
        key: "error",
        duration: 0,
      });
    } else {
      notification.close("error");
    }
  }, [error]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#155DA1" />
        <title>Link Shortener Admin | Hack4Impact UIUC</title>
        <link
          rel="manifest"
          href="manifest.json"
          crossOrigin="use-credentials"
        />
        <link rel="icon" type="image/png" href="logo-16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="logo-32.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="logo-apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Context.Provider value={{ error, setError }}>
          <Navbar />
          <Content>
            <Component {...pageProps} />
          </Content>
        </Context.Provider>
      </SessionProvider>
    </>
  );
}
export default MyApp;
