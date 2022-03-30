import { DatabaseIcon } from "@heroicons/react/outline";

type EmptyChartProps = {
  message: string;
};

export const EmptyChart: React.FC<EmptyChartProps> = ({ message }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full h-[300px] p-10 rounded-md bg-white text-gray-500">
      <DatabaseIcon className="h-5 mr-1" />
      <div>{message}</div>
    </div>
  );
};
