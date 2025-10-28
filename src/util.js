import dayjs from "dayjs";

var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs.extend(weekOfYear);

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();

  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;

  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

export function getWeek(month = dayjs().month()) {
  const year = dayjs().year();

  // const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let WeekOfYear = dayjs().week();
  // console.log("Week = ", WeekOfYear);
  let middleOfTheCurrentWeek = dayjs().week(WeekOfYear);
  let b = middleOfTheCurrentWeek.date();
  let a = middleOfTheCurrentWeek.day();
  let currentMonthCount = b - a - 1;

  // console.log(dayjs().week(1));
  // console.log(dayjs().week(2));
  // console.log(dayjs().week(3));
  // console.log(dayjs().week(WeekOfYear));
  // returns wednesday
  const daysMatrix = new Array(7).fill([]).map(() => {
    currentMonthCount++;
    return dayjs(new Date(year, month, currentMonthCount));
  });
  return daysMatrix;
}
