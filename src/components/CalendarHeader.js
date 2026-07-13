import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader(props) {
  const { daySelected, setDaySelected } = useContext(GlobalContext);
  const { toggleCalendarView, calendarView } = props;

  function handlePrev() {
    if (calendarView === "Day") {
      setDaySelected(daySelected.subtract(1, "day"));
    } else if (calendarView === "Week") {
      setDaySelected(daySelected.subtract(1, "week"));
    } else {
      setDaySelected(daySelected.subtract(1, "month"));
    }
  }
  function handleNext() {
    if (calendarView === "Day") {
      setDaySelected(daySelected.add(1, "day"));
    } else if (calendarView === "Week") {
      setDaySelected(daySelected.add(1, "week"));
    } else {
      setDaySelected(daySelected.add(1, "month"));
    }
  }
  function handleReset() {
    setDaySelected(dayjs());
  }

  return (
    <header className="px-4 py-2 flex items-center border-b border-gray-200">
      <img src={logo} alt="calender" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5 hover:bg-gray-50 transition-all">
        Today
      </button>
      <button onClick={handlePrev}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 hover:bg-gray-100 p-1.5 rounded-full transition-all">
          chevron_left
        </span>
      </button>
      <button onClick={handleNext}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 hover:bg-gray-100 p-1.5 rounded-full transition-all">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-black-500 font-bold">
        {calendarView === "Day"
          ? daySelected.format("MMMM DD, YYYY")
          : daySelected.format("MMMM YYYY")}
      </h2>

      <div className="ml-auto">
        <button
          className="border border-gray-300 rounded-lg py-2 px-5 text-gray-700 font-medium hover:bg-gray-100 active:bg-gray-250 transition-all duration-150 shadow-sm cursor-pointer"
          onClick={toggleCalendarView}
        >
          {calendarView} View
        </button>
      </div>
    </header>
  );
}
