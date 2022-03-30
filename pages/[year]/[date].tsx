import type { NextPage } from "next";
import { useRouter } from "next/router";
import { parseDate } from "../../lib/time";
import { Dashboard } from "../../components/Dashboard";
import { parseYear } from "../../lib/time";

const Home: NextPage = () => {
  const router = useRouter();
  const year = parseYear(router.query.year);
  const date = parseDate(router.query.date);
  return <Dashboard year={year} date={date} />;
};

export default Home;
