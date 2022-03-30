import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Dashboard } from "../components/Dashboard";

const Home: NextPage = () => {
  return <Dashboard year={new Date().getFullYear()} />;
};

export default Home;
