import React, { useState, useRef, useEffect } from "react";

const CustomSelect = ({ options, value, onChange, label, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      {label && <label>{label}</label>}
      <div
        className={`custom-select text-white py-3 px-2 mt-1 border-2 rounded-xl border-[#2b2b2b] bg-corklasCard cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === value)?.label || "Vyberte..."}
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-corklasCard border border-[#2b2b2b]  "
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select-option text-white p-2 cursor-pointer hover:bg-[#2a2a2a]`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
