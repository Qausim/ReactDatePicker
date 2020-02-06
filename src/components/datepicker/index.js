import React, { useState } from "react";

import "./styles/datepicker.style.css";
import CalendarView from "../calendar-view";

const DatePicker = ({
  value,
  format,
  require,
  inputStyle,
  inputClassName,
  parentClassName,
  handleDateChange
}) => {
  const [showCalendarView, setShowCalendarView] = useState(false);
  const inputProps = {};
  if (require) inputProps.required = true;
  inputProps.placeholder = format ? format : "DD/MM/YYYY";

  const handleInputFocus = () => setShowCalendarView(true);

  return (
    <div
      className={`datepicker-wrapper${
        parentClassName ? ` ${parentClassName}` : ""
      }`}
    >
      <input
        type="text"
        className={inputClassName}
        value={value || ""}
        style={inputStyle}
        onChange={({ target }) => {
          target.value = value || "";
        }}
        onFocus={handleInputFocus}
        {...inputProps}
      />
      <CalendarView
        {...{
          value,
          format,
          handleDateChange,
          showCalendarView,
          setShowCalendarView
        }}
      />
    </div>
  );
};

export default DatePicker;
