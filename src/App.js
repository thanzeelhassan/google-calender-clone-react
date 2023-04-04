import "./App.css";
import { getMonth, getWeek } from "./util";
import React, { useState, useContext, useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import Week from "./components/Week";
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

  const [weekOrMonth, setWeekOrMonth] = useState("Month");

  function toggleWeekOrMonth() {
    if (weekOrMonth === "Month") {
      setWeekOrMonth("Week");
    } else {
      setWeekOrMonth("Month");
    }
  }

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader
          toggleWeekOrMonth={toggleWeekOrMonth}
          weekOrMonth={weekOrMonth}
        />

        <div className="flex flex-1">
          <Sidebar />
          {weekOrMonth === "Month" ? (
            <Month month={currentMonth} />
          ) : (
            <Week week={currentWeek} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
