import React from "react";
// import Day from "./Day";

import Hour from "./Hour";
export default function Week({ week }) {
  console.log(week);
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-24">
      {week.map((day, i) => (
        <React.Fragment key={i}>
          <Hour day={day} key={i} />
        </React.Fragment>
      ))}
    </div>
  );
}
