import dayjs from "dayjs";

var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

export function getMonth(monthOrDay = dayjs()) {
  let day;
  if (dayjs.isDayjs(monthOrDay)) {
    day = monthOrDay;
  } else if (typeof monthOrDay === "number") {
    day = dayjs().month(monthOrDay);
  } else {
    day = dayjs(monthOrDay);
  }

  const year = day.year();
  const month = day.month();

  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  const dayIndex = (firstDayOfTheMonth + 6) % 7;
  let currentMonthCount = 0 - dayIndex;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getWeek(monthOrDay = dayjs()) {
  let day;
  if (dayjs.isDayjs(monthOrDay)) {
    day = monthOrDay;
  } else if (typeof monthOrDay === "number") {
    day = dayjs().month(monthOrDay);
  } else {
    day = dayjs(monthOrDay);
  }

  const startOfWeek = day.day() === 0 ? day.subtract(6, "day") : day.subtract(day.day() - 1, "day");
  const daysMatrix = new Array(7).fill(null).map((_, i) => {
    return startOfWeek.add(i, "day");
  });
  return daysMatrix;
}
