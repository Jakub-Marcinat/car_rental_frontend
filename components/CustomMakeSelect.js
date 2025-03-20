import React, { useState, useRef, useEffect } from "react";

const CustomMakeSelect = ({ options, value, onChange, label, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (val) => {
    onChange({ target: { value: val } }); // Pass an object with the value
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
      {" "}
      {/* Make parent relative */}
      {label && <label>{label}</label>}
      <div
        className={`custom-select text-white py-3 px-2 border-2 rounded-xl border-[#2b2b2b] bg-corklasCard cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {options.find((opt) => opt.value === value)?.label || "Select..."}
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-corklasCard border border-[#2b2b2b]"
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select-option text-white p-2 cursor-pointer hover:bg-[#151515]`}
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

export default CustomMakeSelect;
