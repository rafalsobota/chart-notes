import { Measurement, MetricName, metricNames, Note } from "../lib/api/types";
import { formatDate } from "../lib/time";
import { metricLabel, metricTextColor } from "../lib/api/models/metrics";
import { NoteCard } from "./NoteCard";

type NotesSummary = {
  recentNote?: Note;
  notesCount: number;
};

const makeNotesSummary = (notes?: Note[]): NotesSummary => {
  if (!notes) {
    return { notesCount: 0 };
  }
  const recentNote = notes[notes.length - 1];
  return {
    notesCount: notes.length,
    recentNote,
  };
};

type MeasurementChartTooltipProps = {
  active?: boolean;
  payload: { name: string; value: number; payload: Measurement }[];
};

export const MeasurementChartTooltip: React.FC<
  MeasurementChartTooltipProps
> = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const measurement = payload[0].payload;
    const notesSummary = makeNotesSummary(measurement.notes);
    return (
      <div className="flex flex-col items-start space-y-1">
        <div className="font-semibold text-gray-600 bg-white">
          {formatDate(measurement.date, true)}
        </div>
        {metricNames.map((metric) => {
          <MetricTooltip
            metric={metric}
            measurement={measurement}
            key={metric + `-label`}
          />;
        })}
        {notesSummary.recentNote && (
          <div className="flex flex-row items-center max-w-xs md:max-w-sm">
            <NoteCard note={notesSummary.recentNote} variant="small" />
            {notesSummary.notesCount > 1 && (
              <div className="flex-grow-0 px-1 text-xs text-gray-600 bg-white min-w-fit">
                <div className="block md:hidden">
                  + {notesSummary.notesCount - 1}
                </div>
                <div className="hidden md:block">
                  and {notesSummary.notesCount - 1} more
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

type MetricTooltipProps = {
  key?: string;
  metric: MetricName;
  measurement: Measurement;
};

export const MetricTooltip: React.FC<MetricTooltipProps> = ({
  key,
  metric,
  measurement,
}) => {
  return (
    <div
      className={`flex flex-row items-baseline align-bottom bg-white ${metricTextColor(
        metric
      )}`}
      key={key}
    >
      <div className="text-xl font-semibold">{measurement[metric]}</div>
      <div className="pl-1 text-xs">{metricLabel(metric)}</div>
    </div>
  );
};
