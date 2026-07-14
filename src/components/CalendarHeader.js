import dayjs from "dayjs";
import React, { useContext, useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function CalendarHeader(props) {
  const { daySelected, setDaySelected, user, setUser, logout } = useContext(GlobalContext);
  const { toggleCalendarView, calendarView } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isPlaceholderClient = !process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.REACT_APP_GOOGLE_CLIENT_ID.includes("placeholder");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await res.json();
        setUser(userInfo);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    },
    onError: (err) => {
      console.error("Google Login failed:", err);
    }
  });

  const handleLoginClick = () => {
    if (isPlaceholderClient) {
      setUser({
        name: "Demo User",
        email: "demo.user@example.com",
        picture: "https://lh3.googleusercontent.com/a/default-user=s120-c",
        isMock: true,
      });
    } else {
      googleLogin();
    }
  };

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

      <div className="ml-auto flex items-center gap-4">
        <button
          className="border border-gray-300 rounded-lg py-2 px-5 text-gray-700 font-medium hover:bg-gray-100 active:bg-gray-250 transition-all duration-150 shadow-sm cursor-pointer"
          onClick={toggleCalendarView}
        >
          {calendarView} View
        </button>

        {!user ? (
          <button
            onClick={handleLoginClick}
            className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-all duration-150 shadow-sm cursor-pointer animate-fade-in-down"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Sign in</span>
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 hover:shadow-md transition-all cursor-pointer focus:outline-none flex items-center justify-center"
            >
              <img
                src={user.picture}
                alt={user.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 py-6 px-5 z-50 flex flex-col items-center text-center animate-fade-in-down origin-top-right transition-all duration-200">
                {user.isMock && (
                  <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-xs py-1.5 px-3 rounded-lg mb-4 font-medium flex items-center justify-center gap-1.5">
                    <span className="material-icons-outlined text-sm">info</span>
                    Mock Mode: Client ID not configured
                  </div>
                )}
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 mb-3">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-gray-900 font-bold text-lg leading-snug">{user.name}</h3>
                <p className="text-gray-500 text-sm mb-5 break-all w-full">{user.email}</p>
                <div className="w-full border-t border-gray-100 pt-4 mt-2">
                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-colors duration-150 cursor-pointer shadow-sm text-sm"
                  >
                    <span className="material-icons-outlined text-base">logout</span>
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
