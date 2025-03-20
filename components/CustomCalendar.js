import React, { useState, useEffect, useRef } from "react";

const CustomCalendar = ({ selectedDate, onChange, onClose }) => {
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

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      i + 1
    );
    const isSelected =
      selectedDate && date.toDateString() === selectedDate.toDateString();
    days.push(
      <div
        key={i}
        className={`calendar-day ${isSelected ? "selected" : ""}`}
        onClick={() => {
          onChange(date);
          onClose();
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
    <div ref={calendarRef} className="custom-calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <span>
          {currentMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day-header">Po</div>
        <div className="calendar-day-header">Ut</div>
        <div className="calendar-day-header">St</div>
        <div className="calendar-day-header">Št</div>
        <div className="calendar-day-header">Pi</div>
        <div className="calendar-day-header">So</div>
        <div className="calendar-day-header">Ne</div>
        {days}
      </div>
    </div>
  );
};

export default CustomCalendar;
