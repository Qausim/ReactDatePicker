import React from "react";
import { formatDateToString } from "./utils/formatDate";

const Controls = ({
  setShowCalendarView,
  handleDateChange,
  currentDate,
  format
}) => {
  const handleSet = () => {
    handleDateChange(formatDateToString(currentDate, format));
    setShowCalendarView(false);
  };

  const handleClear = () => {
    handleDateChange("");
    setShowCalendarView(false);
  };

  return (
    <div className="controls">
      <button onClick={handleClear}>clear</button>

      <div>
        <button onClick={() => setShowCalendarView(false)}>cancel</button>

        <button onClick={handleSet}>set</button>
      </div>
    </div>
  );
};

export default Controls;
