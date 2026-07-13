# Google Calendar Clone (React & Tailwind CSS)

A functional, responsive clone of the Google Calendar web application built with React, Tailwind CSS, and Day.js. It features a complete Month view, a Week view (organized by hour slots), interactive event management via modals, LocalStorage synchronization, and Event categorization/filtering with custom-colored labels.

## 🚀 Live Demo
Explore the application online: [Google Calendar Clone on Netlify](https://google-calender-clone-react.netlify.app/)

---

## ✨ Key Features
- **Month and Week Views**: Toggle seamlessly between month-grid and hourly week-grid layouts.
- **Event CRUD Operations**: Click on any date cell or hour slot to add events with titles, descriptions, and color-coded labels. Delete or update existing events easily.
- **Synchronized Mini-Calendar**: An interactive sidebar calendar to quickly navigate months and select specific days.
- **Color-Coded Status Labels**: Organize events with multiple colors (indigo, gray, green, blue, red, purple) and toggle individual checked states to filter the calendar display dynamically.
- **LocalStorage Persistence**: Auto-saves your calendar events locally, preserving them across page reloads.

---

## 🛠️ Architecture & Core Components

The codebase follows a modular React component structure with global state orchestrated through the React Context API.

```
src/
├── assets/                  # Images and SVG icons (e.g., logo, add-plus)
├── components/
│   ├── CalendarHeader.js    # Navigates months, toggles week/month views, and resets to "Today"
│   ├── Sidebar.js           # Wraps Create Event, Small Calendar, and Labels
│   ├── CreateEventButton.js # Opens the Event modal
│   ├── SmallCalendar.js     # Side mini-calendar for navigation and selection
│   ├── Labels.js            # Key/value labels to filter events dynamically
│   ├── Month.js             # Renders the 5-week day-grid
│   ├── Day.js               # Cell container that matches days and lists events
│   ├── Week.js              # Renders the 7-day week matrix
│   ├── Hour.js              # Lists time slots and events within the week view
│   └── EventModal.js        # Event editor popup (form logic, validation, colors)
├── context/
│   ├── GlobalContext.js     # Context template/interface for calendar state
│   └── ContextWrapper.js    # Houses state hooks, reducers (CRUD logic), and localStorage side-effects
├── util.js                  # Matrix generation algorithms using Day.js
├── App.js                   # Root layout coordinator
└── index.js                 # Entry point wrapper
```

### State Management Flow
- **GlobalContext**: Stores active states like selected day, small calendar indices, active category labels, modal visibility, and list of current events.
- **useReducer (savedEventsReducer)**: Orchestrates actions for:
  - `push`: Creates a new calendar event.
  - `update`: Edits details/labels of a designated event.
  - `delete`: Removes the event from the state.
- **LocalStorage Sync**: Listens to changes in state events and sets items under `"savedEvents"` key.

---

## 📝 Technologies Used
- **Frontend Framework**: [React 18](https://react.dev/)
- **Utility Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Configuration tool**: [Craco](https://github.com/dilanx/craco) (custom PostCSS/Tailwind configuration without ejecting)
- **Time/Date Engine**: [Day.js](https://day.js.org/)
- **Design Icons**: Material Icons Outlined

---

## 💻 Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn

### Installation & Local Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/thanzeelhassan/google-calender-clone-react.git
   cd google-calender-clone-react
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the local development server**:
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

4. **Build the production application**:
   ```bash
   npm run build
   ```
