import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApiProvider } from "../lib/api";
import ReactTooltip from "react-tooltip";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider>
      <Component {...pageProps} />
      <ReactTooltip />
    </ApiProvider>
  );
}

export default MyApp;
