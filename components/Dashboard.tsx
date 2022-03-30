import { useMeasurements } from "../lib/api";
import { Timestamp } from "../lib/api/types";
import { useCallback, useEffect, useState } from "react";
import { EmptyChart } from "./EmptyChart";
import { MeasurementsChart } from "./MeasurementsChart";
import Link from "next/link";
import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/outline";
import { MeasurementsFeed } from "./MeasurementFeed";
import { useRouter } from "next/router";

export type DashboardProps = {
  year: number;
  date?: number;
};

export const Dashboard: React.FC<DashboardProps> = ({ year, date }) => {
  const { data, status } = useMeasurements(year);
  const [selectedDate, setDate] = useState<Timestamp | undefined>(date);
  const router = useRouter();

  useEffect(() => {
    setDate(date);
  }, [date, setDate]);

  const onDateSelected = useCallback(
    (date?: Timestamp) => {
      setDate(date);
      if (date) {
        router.push(`/[year]/[date]`, `/${year}/${date}`, { shallow: true });
      } else {
        router.push(`/[year]/[date]`, `/${year}/-`, { shallow: true });
      }
    },
    [year]
  );

  return (
    <div className="space-y-3">
      <h1 className="pt-10 text-4xl text-center text-gray-900">
        Reactor Temperature
      </h1>
      <h2 className="text-center text-gray-500 text-md">
        <Link href={`/${year - 1}`}>
          <button className="p-2">
            <ArrowSmLeftIcon className="h-5 -mb-1 active:-ml-1 active:mr-1" />
          </button>
        </Link>
        Year {year}
        <Link href={`/${year + 1}`}>
          <button className="p-2">
            <ArrowSmRightIcon className="h-5 -mb-1 active:-mr-1 active:ml-1" />
          </button>
        </Link>
      </h2>

      {status === "loading" || status === "idle" ? (
        <EmptyChart message={"Loading..."} />
      ) : status === "error" ? (
        <EmptyChart message={"Error"} />
      ) : data.length < 1 ? (
        <EmptyChart message={"No data available"} />
      ) : (
        <>
          <MeasurementsChart
            data={data}
            onDateSelected={onDateSelected}
            selectedDate={selectedDate}
          />
          <MeasurementsFeed
            measurements={data}
            selectedDate={selectedDate}
            onDateSelected={onDateSelected}
          />
        </>
      )}
    </div>
  );
};
