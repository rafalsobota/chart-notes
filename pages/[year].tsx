import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dashboard } from "../components/Dashboard";
import { parseYear } from "../lib/time";

const Home: NextPage = () => {
  const router = useRouter();
  const year = parseYear(router.query.year);
  return <Dashboard year={year} />;
};

export default Home;
