import "./App.css";
import { getMonth, getWeek } from "./util";
import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Week from "./components/Week";
import DayView from "./components/DayView";
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentWeek, setCurrentWeek] = useState(getWeek());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  useEffect(() => {
    setCurrentWeek(getWeek(monthIndex));
  }, [monthIndex]);

  const [calendarView, setCalendarView] = useState("Month");

  function toggleCalendarView() {
    if (calendarView === "Month") {
      setCalendarView("Week");
    } else if (calendarView === "Week") {
      setCalendarView("Day");
    } else {
      setCalendarView("Month");
    }
  }

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader
          toggleCalendarView={toggleCalendarView}
          calendarView={calendarView}
        />

        <div className="flex flex-1">
          <Sidebar />
          {calendarView === "Month" && <Month month={currentMonth} />}
          {calendarView === "Week" && <Week week={currentWeek} />}
          {calendarView === "Day" && <DayView />}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
