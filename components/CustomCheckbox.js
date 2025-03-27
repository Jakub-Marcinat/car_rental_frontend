import React from "react";

const CustomCheckbox = ({ label, checked, onChange, width }) => {
  return (
    <div className="flex items-center" style={{ width: width || "auto" }}>
      <label className="flex items-center cursor-pointer">
        <div
          className={`relative flex items-center justify-center w-6 h-6 border-2 rounded-full ${
            checked
              ? "border-[#2b2b2b] bg-corklasCard"
              : "border-[#2b2b2b] bg-transparent"
          }`}
        >
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              width="18"
              height="18"
            >
              <path d="M20.285 2L9 13.284 3.636 7.92 2.22 9.336 9 16l12-12.664z" />
            </svg>
          )}
          <input
            type="checkbox"
            className="absolute opacity-0 cursor-pointer"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
        </div>
        {label && <span className="ml-2 text-black">{label}</span>}
      </label>
    </div>
  );
};

export default CustomCheckbox;