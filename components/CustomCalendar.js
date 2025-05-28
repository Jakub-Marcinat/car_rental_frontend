import React, { useState, useEffect, useRef } from "react";

const CustomCalendar = ({
  selectedDate,
  onChange,
  onClose,
  bgColor = "#121212",
  textColor = "white",
  borderColor = "#2b2b2b",
  selectedBgColor = "#FFFA00",
  selectedTextColor = "#121212",
  dayHoverBgColorProp,
}) => {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate || new Date())
  );
  const calendarRef = useRef(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  );
  const days = [];

  const dayHoverBg =
    dayHoverBgColorProp !== undefined ? dayHoverBgColorProp : "#1e1e1e";

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(
      Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), i)
    );

    const normalizeDate = (d) =>
      new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

    const isSelected =
      selectedDate &&
      normalizeDate(date).getTime() === normalizeDate(selectedDate).getTime();

    const isPastDate =
      date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

    days.push(
      <div
        key={i}
        className={`calendar-day ${isSelected ? "selected" : ""} ${
          isPastDate ? "disabled" : ""
        }`}
        onClick={() => {
          if (!isPastDate) {
            const normalizedDate = new Date(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            onChange(normalizedDate);
            onClose();
          }
        }}
        style={{
          backgroundColor: isSelected ? selectedBgColor : "transparent",
          color: isPastDate
            ? "#777"
            : isSelected
            ? selectedTextColor
            : textColor,
          borderRadius: isSelected ? "4px" : "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          cursor: isPastDate ? "not-allowed" : "pointer",
          pointerEvents: isPastDate ? "none" : "auto",
        }}
        onMouseEnter={(e) => {
          if (!isSelected && !isPastDate) {
            e.target.style.backgroundColor = dayHoverBg;
            e.target.style.color = "#121212";
            e.target.style.borderRadius = "4px";
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected && !isPastDate) {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = textColor;
            e.target.style.borderRadius = "0";
          }
        }}
      >
        {i}
      </div>
    );
  }

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={calendarRef}
      className="custom-calendar"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "4px",
        padding: "10px",
        zIndex: 10,
        position: "absolute",
      }}
    >
      <div
        className="calendar-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            color: textColor,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
          className="hover:bg-[#FFFA00] hover:text-[#121212] hover:rounded-lg  rounded-md px-2 py-1 transition-colors duration-200"
        >
          &lt;
        </button>
        <span style={{ color: textColor }}>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          onClick={nextMonth}
          style={{
            color: textColor,
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
          className="hover:bg-[#FFFA00] hover:text-[#121212] hover:rounded-lg rounded-lg px-2 py-1 transition-colors duration-200"
        >
          &gt;
        </button>
      </div>
      <div
        className="calendar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px",
        }}
      >
        {["Po", "Ut", "St", "Št", "Pi", "So", "Ne"].map((dayHeader) => (
          <div
            key={dayHeader}
            className="calendar-day-header"
            style={{
              color: textColor,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px",
            }}
          >
            {dayHeader}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

export default CustomCalendar;
