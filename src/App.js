import React, { useState } from "react";
import "./styles.css";
import DatePicker from "./components/datepicker";

export default function App() {
  const [dateString, setDateString] = useState("");
  const handleDateChange = value => setDateString(value);
  const inputStyle = {
    height: "30px",
    padding: "5px"
  };

  return (
    <div className="App">
      <DatePicker
        {...{
          inputStyle,
          handleDateChange,
          value: dateString,
          format: "YYYY/MM/DD"
        }}
      />
    </div>
  );
}
