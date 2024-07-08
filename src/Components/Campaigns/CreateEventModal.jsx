import React, { useState } from "react"
import { nanoid } from 'nanoid'
import styles from "./CSS/Campaign.module.css"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import DayTimePicker from "./DayTimePicker"
import DateRangePicker from "./DateRangePicker"
import TextField from '@mui/material/TextField';

export default function CreateEventModal({ state, handleClose, handleSubmitEvent }) {
  const [campaignType, setCampaignType] = useState("")
  const [campaignName, setCampaignName] = useState("")


  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  })

  const [times, setTimes] = useState({
    Sunday: { start: null, end: null },
    Monday: { start: null, end: null },
    Tuesday: { start: null, end: null },
    Wednesday: { start: null, end: null },
    Thursday: { start: null, end: null },
    Friday: { start: null, end: null },
    Saturday: { start: null, end: null },
  })

  const handleEventTypeChange = (event) => {
    setCampaignType(event.target.value)
  }

  const handleDateChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate })
  }

  const handleWeekTimeChange = (day, timeType, value) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [day]: { ...prevTimes[day], [timeType]: value },
    }))
  }

  const handleSubmit = () => {
    const eventData = {
      "uid": nanoid(5),
      campaignName,
      campaignType,
      dateRange,
      times,
    }
    handleSubmitEvent(eventData)
    handleClose()
  }

  const boxStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Modal open={state} onClose={handleClose}>
        <Box sx={boxStyle}>
          <div>
            <div style={{ marginBottom: "30px" }}>
              <TextField value={campaignName} onChange={(e) => setCampaignName(e.target.value)} label="Campaign Name" variant="standard" />
            </div>
            <div className={styles.createCampaignModalSecondCol}>
              <FormControl size="small" style={{ maxWidth: "250px", width: "100%" }}>
                <InputLabel id="campaign-type">Type</InputLabel>
                <Select labelId="campaign-type" value={campaignType} label="type" onChange={handleEventTypeChange}>
                  <MenuItem value={"Cost Per Order"}>Cost Per Order</MenuItem>
                  <MenuItem value={"Cost Per Click"}>Cost Per Click</MenuItem>
                  <MenuItem value={"Buy One Get One"}>Buy One Get One</MenuItem>
                </Select>
              </FormControl>
              <DateRangePicker handleDateChange={handleDateChange} />
            </div>
          </div>
          <div className={styles.createCampaignModalThirdCol} >

            {Object.keys(times).map((day) => (
              <DayTimePicker key={day} label={day} handleTimeChange={(timeType, value) => handleWeekTimeChange(day, timeType, value)} />
            ))}

          </div>
          <div>
            <Button variant="contained" onClick={handleSubmit} style={{ marginRight: "20px" }}>
              Create
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
