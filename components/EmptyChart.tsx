import { DatabaseIcon } from "@heroicons/react/outline";

type EmptyChartProps = {
  message: string;
};

export const EmptyChart: React.FC<EmptyChartProps> = ({ message }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full p-5 text-gray-400 bg-white rounded-md">
      <DatabaseIcon className="h-5 mr-1" />
      <div>{message}</div>
    </div>
  );
};
