const MILLISECONDS_PER_DAY = 86400000;

interface Date {
  year: number;
  month: number;
  date: number;
}

interface TimeSeriesEntry {
  date: Date;
  instances: number;
}

export function dateToString(dateObj: Date): string {
  const { year, month, date } = dateObj;

  return `${month}/${date}/${year}`;
}

function getDate(timestamp: number): Date {
  const date = new Date(timestamp);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
}

function datesEqual(first: Date, second: Date): boolean {
  return (
    first.date === second.date &&
    first.month === second.month &&
    first.year === second.year
  );
}

function datesNonConsecutive(first: Date, second: Date): boolean {
  return (
    second.date - first.date > 1 ||
    second.month - first.month > 1 ||
    second.year - first.year > 1 ||
    (second.date !== 1 &&
      (second.month !== first.month || second.year !== first.year))
  );
}

export function generateTimeSeries(timestamps: number[]): TimeSeriesEntry[] {
  const timeSeries: TimeSeriesEntry[] = [];

  timestamps.sort();

  timestamps.forEach((timeStamp) => {
    const date = getDate(timeStamp);
    const latestEntry = timeSeries[timeSeries.length - 1];

    if (latestEntry !== undefined && datesEqual(latestEntry.date, date)) {
      latestEntry.instances += 1;
    } else {
      if (latestEntry !== undefined) {
        const latestDate = latestEntry.date;

        // If gap between latest date and new date, fill with empty time series entries.
        if (datesNonConsecutive(latestDate, date)) {
          // Start with day after latest date.
          let intermediateDate =
            new Date(
              latestDate.year,
              latestDate.month - 1,
              latestDate.date
            ).getTime() + MILLISECONDS_PER_DAY;

          // Fill until we've reached new date.
          while (!datesEqual(getDate(intermediateDate), date)) {
            timeSeries.push({ date: getDate(intermediateDate), instances: 0 });
            intermediateDate += MILLISECONDS_PER_DAY;
          }
        }
      }

      timeSeries.push({ date, instances: 1 });
    }
  });

  return timeSeries;
}
