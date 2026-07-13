import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader(props) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const { toggleWeekOrMonth, weekOrMonth } = props;

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month(),
    );
  }
  // const options = [
  //   { value: "Day", label: "Day" },
  //   { value: "Week", label: "Week" },
  //   { value: "Month", label: "Month" },
  //   { value: "Year", label: "Year" },
  //   { value: "Schedule", label: "Schedule" },
  //   { value: "4 days", label: "4 days" },
  // ];

  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={logo} alt="calender" className="w-12 h-12" />
        <h1 className="text-xl text-gray-500 font-bold">Calendar</h1>
        <button onClick={handleReset} className="border rounded py-2 px-4">
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600">
            chevron_right
          </span>
        </button>
        <h2 className="text-xl text-black-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>

      <button className="border rounded py-2 px-4" onClick={toggleWeekOrMonth}>
        {weekOrMonth}
      </button>
    </header>
  );
}
