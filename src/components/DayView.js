import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

export default function DayView() {
  const {
    daySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === daySelected.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, daySelected]);

  function handleCreateEvent() {
    setSelectedEvent(null);
    setShowEventModal(true);
  }

  function handleEventClick(e, evt) {
    e.stopPropagation();
    setSelectedEvent(evt);
    setShowEventModal(true);
  }

  const isToday = daySelected.format("DD-MM-YY") === dayjs().format("DD-MM-YY");

  return (
    <div className="flex-1 flex flex-col bg-gray-50 p-6 overflow-y-auto">
      {/* Date Header Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 flex justify-between items-center transition-all hover:shadow-md">
        <div>
          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            isToday ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
          }`}>
            {isToday ? "Today" : daySelected.format("dddd")}
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800 mt-2">
            {daySelected.format("MMMM DD, YYYY")}
          </h2>
        </div>
        <button
          onClick={handleCreateEvent}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm hover:shadow transition-all duration-150"
        >
          <span className="material-icons-outlined text-md">add</span>
          <span>Add Event</span>
        </button>
      </div>

      {/* Events Container */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col min-h-[400px]">
        <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2">
          <span className="material-icons-outlined text-gray-500">
            event_note
          </span>
          <span>Events for Day</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-semibold">
            {dayEvents.length}
          </span>
        </h3>

        {dayEvents.length === 0 ? (
          <div 
            onClick={handleCreateEvent}
            className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 cursor-pointer hover:bg-blue-50/30 hover:border-blue-300 transition-all group"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-all">
              <span className="material-icons-outlined text-3xl text-gray-400 group-hover:text-blue-600 transition-all">
                calendar_today
              </span>
            </div>
            <p className="text-gray-600 font-medium mb-1">No events scheduled</p>
            <p className="text-sm text-gray-400 text-center max-w-sm mb-4">
              Keep track of your day! Click here or the button above to add your first event.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dayEvents.map((evt, idx) => (
              <div
                key={idx}
                onClick={(e) => handleEventClick(e, evt)}
                className="bg-white hover:bg-gray-50 p-4 rounded-xl border border-gray-200 transition-all duration-200 cursor-pointer shadow-sm hover:shadow relative group flex gap-3 items-stretch"
              >
                {/* Color Indicator Bar inside card - using safelisted classes bg-${evt.label}-500 */}
                <div className={`w-2 rounded bg-${evt.label}-500 flex-shrink-0`} />

                <div className="flex-1 flex flex-col justify-between ml-2">
                  <div>
                    <h4 className="font-bold text-gray-800 text-md pr-6 break-words mb-1 group-hover:text-blue-600 transition-all">
                      {evt.title || "(No Title)"}
                    </h4>
                    <p className="text-sm text-gray-500 break-words mb-3 whitespace-pre-line line-clamp-3">
                      {evt.description || "No description provided."}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {evt.label}
                    </span>
                    <span className="material-icons-outlined text-gray-400 group-hover:text-blue-600 text-sm transition-all">
                      edit
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
