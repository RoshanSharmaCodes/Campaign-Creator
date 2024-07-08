import React, { useContext, useState } from "react"
import { campaignContext } from "./Campaign"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import FormGroup from "@mui/material/FormGroup"
import DayTimePicker from "./DayTimePicker"
import DateRangePicker from "./DateRangePicker"
import TextField from '@mui/material/TextField';

export default function EditEventModal({ state, handleClose, prefillData }) {
  const [campaignType, setCampaignType] = useState(prefillData.campaignType)
  const [campaignName, setCampaignName] = useState("")
  const {campaignData, setCampaignData} = useContext(campaignContext)


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

  const handleChange = (event) => {
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
      "uid": prefillData.uid,
      campaignName : campaignName ? campaignName : prefillData.campaignName,
      campaignType,
      dateRange: dateRange.startDate && dateRange.endDate? dateRange : prefillData.dateRange,
      times,
    }
    const filteredItem = campaignData.filter((item) => item.uid !== prefillData.uid)
    setCampaignData([...filteredItem, eventData])
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
      <Modal open={state} onClose={handleClose} >
        <Box sx={boxStyle}>
          <div>
            <div style={{marginBottom:"30px"}}>
            <TextField defaultValue={prefillData.campaignName} onChange={(e)=> setCampaignName(e.target.value)} label="Standard" variant="standard" />
            </div>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:"30px"}}>
              <FormControl size="small" style={{maxWidth: "250px", width:"100%"}}>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select labelId="demo-simple-select-label" defaultValue={prefillData.campaignType} id="demo-simple-select"  label="type" onChange={handleChange}>
                  <MenuItem value={"Cost Per Order"}>Cost Per Order</MenuItem>
                  <MenuItem value={"Cost Per Click"}>Cost Per Click</MenuItem>
                  <MenuItem value={"Buy One Get One"}>Buy One Get One</MenuItem>
                </Select>
              </FormControl>
              <DateRangePicker prefillDate={prefillData.dateRange} handleDateChange={handleDateChange} />
            </div>
            
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FormGroup>
              {Object.keys(times).map((day) => (
                <DayTimePicker key={day} prefillData={prefillData.times[day]} label={day} handleTimeChange={(timeType, value) => handleWeekTimeChange(day, timeType, value)} />
              ))}
            </FormGroup>
          </div>
          <div>
            <Button variant="contained" onClick={handleSubmit} style={{ marginRight: "20px" }}>
              Update
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
