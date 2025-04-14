import React, { useRef, useState } from "react";
import CustomCalendar from "./CustomCalendar";

const CustomDateInput = ({
  label,
  value,
  onChange,
  placeholder,
  width,
  bgColor = "#1f1f1f",
  borderColor = "#1f1f1f",
  calendarBgColor = "#121212",
  calendarTextColor = "white",
  calendarBorderColor = "#2b2b2b",
  calendarSelectedBgColor = "#FFFA00",
  calendarSelectedTextColor = "#121212",
  calendarDayHoverBgColor,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleDateChange = (date) => {
    onChange(date.toISOString().split("T")[0]);
    setIsOpen(false);
  };

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" style={{ width: width || "auto" }}>
      {label && <label className="block mb-1">{label}</label>}

      <div
        className="custom-date-input flex items-center text-white py-3 px-2 border-2 rounded-xl pr-8 cursor-pointer"
        onClick={toggleCalendar}
        style={{ backgroundColor: bgColor, borderColor: borderColor }}
      >
        <input
          type="text"
          value={value}
          readOnly
          className="bg-transparent w-full focus:outline-none cursor-pointer"
          ref={inputRef}
          placeholder={placeholder}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="24"
          height="24"
          className="ml-2"
        >
          <path d="M19 4h-2V3h-1v1H8V3H7v1H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V8h14v10z" />
        </svg>
      </div>

      {isOpen && (
        <CustomCalendar
          selectedDate={value ? new Date(value) : null}
          onChange={handleDateChange}
          onClose={() => setIsOpen(false)}
          bgColor={calendarBgColor}
          textColor={calendarTextColor}
          borderColor={calendarBorderColor}
          selectedBgColor={calendarSelectedBgColor}
          selectedTextColor={calendarSelectedTextColor}
          dayHoverBgColorProp={calendarDayHoverBgColor}
        />
      )}
    </div>
  );
};

export default CustomDateInput;
