import { format } from "date-fns-jalali";

/**
 * Get all dates for the week containing `date`.
 * @param {Date|string} date - Current date (Date or parseable string).
 * @param {number} weekStartsOn - 0 for Sunday-start, 1 for Monday-start.
 * @param {"date"|"ymd"|"iso"} as - Output type: Date objects, YYYY-MM-DD, or ISO strings.
 * @returns {{ weekdayIndex: number, dates: (Date|string)[] }}
 */
export function getThisWeek(date = new Date(), weekStartsOn = 0, as = "ymd") {
  // Normalize to a Date
  const d = date instanceof Date ? date : new Date(date);
  // Local midnight to avoid DST/timezone hour shifts
  const localMidnight = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  // Weekday index (0..6) with Sunday=0, Monday=1, ... per JS spec
  const weekdayIndex = localMidnight.getDay();

  // How many days to go back to hit the start of this week
  const diffToStart = (weekdayIndex - weekStartsOn + 7) % 7;

  // Start-of-week (local midnight)
  const start = new Date(localMidnight);
  start.setDate(localMidnight.getDate() - diffToStart);

  // Build the 7 dates of the week
  const datesAsDate = Array.from(
    { length: 7 },
    (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
  );

  // Output formatting
  if (as === "date") {
    return { weekdayIndex, dates: datesAsDate };
  }
  if (as === "iso") {
    // ISO uses UTC—day may shift in some time zones
    return { weekdayIndex, dates: datesAsDate.map(d => d.toISOString()) };
  }
  // Default: YYYY-MM-DD in local time (safer for "calendar" usage)
  return {
    weekdayIndex,
    dates: datesAsDate.map(date => format(date, "yyyy-MM-dd")),
  };
}
