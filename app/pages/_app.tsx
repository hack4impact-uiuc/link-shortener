import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#155DA1" />
        <title>Link Shortener | Hack4Impact UIUC</title>
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
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
