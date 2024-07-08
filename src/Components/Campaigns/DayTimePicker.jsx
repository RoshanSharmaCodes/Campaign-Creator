import React, { useState } from "react"
import dayjs from "dayjs"
import styles from "./CSS/Campaign.module.css"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function DayTimePicker({ label, handleTimeChange, prefillData }) {
  const [active, setActive] = useState(false)

  const handleActiveChange = () => {
    setActive(!active)
  }

  const handleStartTimeChange = (newValue) => {
    const formattedTime = dayjs(newValue).format("HH:mm A")
    handleTimeChange("start", formattedTime)
  }

  const handleEndTimeChange = (newValue) => {
    const formattedTime = dayjs(newValue).format("HH:mm A")
    handleTimeChange("end", formattedTime)
  }

  const handleStartTimeUpdate = (newValue) => {
    const formattedTime = dayjs(newValue).format("HH:mm A")
    handleTimeChange("start", formattedTime)
  }

  const handleEndTimeUpdate = (newValue) => {
    const formattedTime = dayjs(newValue).format("HH:mm A")
    handleTimeChange("end", formattedTime)
  }

  return prefillData ? (
    <div className={styles.dayTimeCont} >
      <FormControlLabel control={<Checkbox onChange={handleActiveChange} defaultChecked={prefillData.start && prefillData.end ? true:false} />} label={label} />
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            sx={{
              ".MuiInputBase-root": {
                height: "40px",
                fontSize: "14px",
                marginRight: "30px",
              },
            }}
            disabled={(prefillData.start && prefillData.end) || active ? false : true}
            label="Start Timing"
            value={dayjs(prefillData.start, "HH:mm A")}
            onChange={handleStartTimeUpdate}
          />

          <TimePicker
            sx={{
              ".MuiInputBase-root": {
                height: "40px", 
                fontSize: "14px", 
              },
            }}
            label="End Timing"
            disabled={(prefillData.start && prefillData.end) || active ? false : true}
            value={dayjs(prefillData.end, "HH:mm A")}
            onChange={handleEndTimeUpdate}
          />
        </LocalizationProvider>
      </div>
    </div>
  ) : (
    <div className={styles.dayTimeCont}>
      <FormControlLabel control={<Checkbox onChange={handleActiveChange} />} label={label} />
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            sx={{
              ".MuiInputBase-root": {
                height: "40px",
                fontSize: "14px",
                marginRight: "30px",
              },
            }}
            label="Start Timing"
            disabled={active ? false : true}
            onChange={handleStartTimeChange}
          />

          <TimePicker
            sx={{
              ".MuiInputBase-root": {
                height: "40px",
                fontSize: "14px",
              },
            }}
            label="End Timing"
            onChange={handleEndTimeChange}
            disabled={active ? false : true}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}
