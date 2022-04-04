import type { NextPage } from "next";
import { useRouter } from "next/router";
import { parseDate } from "../lib/time";
import { Dashboard } from "../components/Dashboard";
import { parseYear } from "../lib/time";

const Home: NextPage = () => {
  const router = useRouter();
  const [yearParam, dateParam] = (router.query.params || []) as string[];
  const year = parseYear(yearParam);
  const date = parseDate(dateParam);
  return <Dashboard year={year} date={date} />;
};

export default Home;
