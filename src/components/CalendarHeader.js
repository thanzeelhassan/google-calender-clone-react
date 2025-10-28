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
        : dayjs().month()
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
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calender" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-black-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

      <div
        className="container-right float-right right-0 ml-80"
        style={{ backgroundColor: "lightblue", marginLeft: "75%" }}
      >
        <button
          className="float-right border rounded py-2 px-4 right-0"
          onClick={toggleWeekOrMonth}
        >
          {weekOrMonth}
        </button>
      </div>
    </header>
  );
}
