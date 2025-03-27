import React, { useState, useRef } from "react";
import TimePicker from "./TimePicker"; // Import the TimePicker component

const CustomTimeInput = ({ label, value, onChange, placeholder, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const toggleTimePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" style={{ width: width || "auto" }}>
      {label && <label className="block mb-1">{label}</label>}

      <div
        className="custom-time-input flex items-center text-white py-3 px-2 border-2 rounded-xl border-[#2b2b2b] bg-corklasCard pr-2 cursor-pointer"
        onClick={toggleTimePicker}
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
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2V8zm1 8c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
        </svg>
      </div>

      {isOpen && (
        <TimePicker
          value={value}
          onChange={(time) => {
            onChange(time);
            setIsOpen(false);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomTimeInput;
