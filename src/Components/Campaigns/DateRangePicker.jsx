import React from "react"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { useState } from "react"
import dayjs from "dayjs"

export default function DateRangePicker({ handleDateChange, prefillDate }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleStartDateChange = (newValue) => {
    newValue = dayjs(newValue).format("DD-MM-YYYY")
    setStartDate(newValue)
    handleDateChange(newValue, endDate)
  }

  const handleEndDateChange = (newValue) => {
    newValue = dayjs(newValue).format("DD-MM-YYYY")
    setEndDate(newValue)
    handleDateChange(startDate, newValue)
  }

  return prefillDate ? (
    <div style={{ display: "flex" }}>
      <div>
        <LocalizationProvider onChange={handleStartDateChange} dateAdapter={AdapterDayjs}>
          <DatePicker
             sx={{
              ".MuiInputBase-root": {
                height: "40px",
                maxWidth:"200px",
                fontSize: "14px",
              },
            }}
            label="Start Date"
            value={dayjs(prefillDate.startDate, "DD-MM-YYYY")}
            onChange={handleStartDateChange}
          />
        </LocalizationProvider>
      </div>
      -
      <div>
        <LocalizationProvider onChange={handleEndDateChange} dateAdapter={AdapterDayjs}>
          <DatePicker
           sx={{
            ".MuiInputBase-root": {
              height: "40px",
              maxWidth:"200px",
              fontSize: "14px",
            },
          }}
            label="End Date"
            value={dayjs(prefillDate.endDate, "DD-MM-YYYY")}
            onChange={handleEndDateChange}
          />
        </LocalizationProvider>
      </div>
    </div>
  ) : (
    <div style={{ display: "flex" }}>
      <div>
        <LocalizationProvider onChange={handleStartDateChange} dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              ".MuiInputBase-root": {
                height: "40px",
                maxWidth:"200px",
                fontSize: "14px",
              },
            }}
            label="Start Date"
            onChange={handleStartDateChange}
          />
        </LocalizationProvider>
      </div>
      &nbsp;
      <div>
        <LocalizationProvider onChange={handleEndDateChange} dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              ".MuiInputBase-root": {
                height: "40px",
                maxWidth:"200px",
                fontSize: "14px",
              },
            }}
            label="End Date"
            onChange={handleEndDateChange}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}
