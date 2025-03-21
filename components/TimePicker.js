import React from "react";

const TimePicker = ({ value, onChange, onClose }) => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(time);
    }
  }

  return (
    <div className="time-picker absolute bg-corklasCard border-2 border-[#2b2b2b] rounded-xl p-2 z-10 w-full">
      {" "}
      {/* Make it full width */}
      <div
        className="time-list"
        style={{ maxHeight: "150px", overflowY: "auto" }}
      >
        {" "}
        {/* Limit height and add scrollbar */}
        {times.map((time) => (
          <button
            key={time}
            onClick={() => {
              onChange(time);
              onClose();
            }}
            className={`block w-full text-left py-2 px-4 rounded-md hover:bg-[#1e1e1e] ${
              value === time ? "bg-[#1e1e1e]" : ""
            }`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
