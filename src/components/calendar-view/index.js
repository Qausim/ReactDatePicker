import React, { useState, useRef } from "react";

import "./calendar.style.css";
import getNumOfMonthDays from "./utils/num-of-month-days";
import CalendarNavigator from "./datepicker-nav.component";
import CalendarHeader from "./datepicker-header.component";
import YearList from "./year-list.component";
import Calendar from "./calendar.component";
import Controls from "./controls.component";
import { formatStringToDate } from "./utils/formatDate";

const CalendarView = ({
  value,
  format,
  showCalendarView,
  handleDateChange,
  setShowCalendarView
}) => {
  const minYear = 1900;
  const maxYear = 2200;
  const currentYearRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(
    value ? formatStringToDate(value, format) : new Date()
  );
  const [showYears, setShowYears] = useState(false);
  const currentDay = currentDate.getDate();
  const { numOfDays, month, year } = getNumOfMonthDays(currentDate);
  const firstDayOfMonth = new Date(`${month + 1}/1/${year}`).getDay();

  const handleDayClick = ({ target: { textContent } }) => {
    setCurrentDate(new Date(`${month + 1}/${textContent}/${year}`));
  };

  const handleMonthBackWards = () => {
    let newYear = year;
    let newMonth;
    if (month) {
      newMonth = month - 1;
    } else {
      newMonth = 11;
      newYear = year - 1;
    }

    if (newYear < minYear) return;

    const startOfNewMonthDateObject = new Date(`${newMonth + 1}/1/${newYear}`);
    const { numOfDays: nmd } = getNumOfMonthDays(startOfNewMonthDateObject);
    let newDate = new Date(`${newMonth + 1}/${currentDay}/${newYear}`);
    if (nmd < currentDay) newDate = startOfNewMonthDateObject;

    setCurrentDate(newDate);
  };

  const handleMonthForwards = () => {
    let newYear = year;
    let newMonth;
    if (month === 11) {
      newMonth = 0;
      newYear = year + 1;
    } else {
      newMonth = month + 1;
    }

    if (newYear > maxYear) return;

    const startOfNewMonthDateObject = new Date(`${newMonth + 1}/1/${newYear}`);
    const { numOfDays: nmd } = getNumOfMonthDays(startOfNewMonthDateObject);
    let newDate = new Date(`${newMonth + 1}/${currentDay}/${newYear}`);
    if (nmd < currentDay) newDate = startOfNewMonthDateObject;

    setCurrentDate(newDate);
  };

  return (
    <div className={`calendar-view-wrapper${showCalendarView ? "" : " hide"}`}>
      <CalendarHeader
        {...{
          year,
          month,
          currentDay,
          currentDate,
          setShowYears,
          currentYearRef
        }}
      />
      {showYears ? (
        <YearList
          {...{
            year,
            month,
            minYear,
            maxYear,
            currentDay,
            setShowYears,
            setCurrentDate,
            currentYearRef
          }}
        />
      ) : (
        <div>
          <CalendarNavigator
            {...{
              year,
              month,
              handleMonthForwards,
              handleMonthBackWards
            }}
          />
          <Calendar
            {...{
              numOfDays,
              currentDay,
              handleDayClick,
              firstDayOfMonth
            }}
          />
        </div>
      )}

      {showYears ? (
        ""
      ) : (
        <Controls
          {...{ setShowCalendarView, handleDateChange, currentDate, format }}
        />
      )}
    </div>
  );
};

export default CalendarView;
