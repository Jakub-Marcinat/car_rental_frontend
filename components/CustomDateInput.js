import React, { useRef, useState } from "react";
import CustomCalendar from "./CustomCalendar";

const CustomDateInput = ({ label, value, onChange, placeholder  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleDateChange = (date) => {
    onChange(date.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    setIsOpen(false);
  };

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">
      {label && <label>{label}</label>}
      <div className="flex items-center">
        <input
          type="text"
          value={value}
          readOnly
          className="custom-date-input text-white py-3 px-2 border-2 rounded-xl border-[#2b2b2b] bg-corklasCard"
          ref={inputRef}
          placeholder={placeholder}
        />
        <button onClick={handleIconClick} className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24"
            height="24"
          >
            <path d="M19 4h-2V3h-1v1H8V3H7v1H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V8h14v10z" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <CustomCalendar
          selectedDate={value ? new Date(value) : null}
          onChange={handleDateChange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomDateInput;
