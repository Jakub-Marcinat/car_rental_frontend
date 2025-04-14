import React from "react";

const TimePicker = ({
  value,
  onChange,
  onClose,
  bgColor = "#121212",
  textColor = "white",
  borderColor = "#2b2b2b",
  hoverBgColorProp, 
  selectedBgColor = "#1e1e1e",
}) => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      times.push(time);
    }
  }

  const hoverBg = hoverBgColorProp !== undefined ? hoverBgColorProp : "#1e1e1e";

  return (
    <div
      className="time-picker absolute z-10 w-full rounded-xl p-2"
      style={{ backgroundColor: bgColor, border: `2px solid ${borderColor}` }}
    >
      <div
        className="time-list"
        style={{ maxHeight: "150px", overflowY: "auto" }}
      >
        {times.map((time) => (
          <button
            key={time}
            onClick={() => {
              onChange(time);
              onClose();
            }}
            className={`block w-full text-left py-2 px-4 rounded-md hover:bg-[${hoverBg}] ${
              value === time ? `bg-[${selectedBgColor}]` : ""
            }`}
            style={{ color: textColor }}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;