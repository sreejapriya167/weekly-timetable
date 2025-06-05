import React from "react";

function DayTabs({ selectedDay, onSelectDay }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="day-tabs">
      {days.map((day) => (
        <div key={day} className="day-card">
          <button
            className={selectedDay === day ? "active" : ""}
            onClick={() => onSelectDay(day)}
          >
            {day}
          </button>
        </div>
      ))}
    </div>
  );
}

export default DayTabs;
