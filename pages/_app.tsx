import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApiProvider } from "../lib/api";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          key="google-fonts-1"
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          key="google-fonts-2"
          rel="preconnect"
          href="https://fonts.gstatic.com"
        />
        <link
          key="google-fonts-3"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        ></meta>
      </Head>
      <ApiProvider>
        <Component {...pageProps} />
      </ApiProvider>
    </>
  );
}

export default MyApp;
