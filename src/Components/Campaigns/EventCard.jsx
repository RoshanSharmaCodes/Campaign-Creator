import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CardHeader from "@mui/material/CardHeader"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import EditEventModal from "./EditEventModal"

export default function EventCard({ data, handleDeleteEvent, handleEditEvent }) {
  const [menuState, setMenuState] = useState(null)
  const [editModal, setEditModal] = useState(false)
  const open = Boolean(menuState)
  
  
  const handleClose = () => {
    setMenuState(null)
  }

  const handleMenuOpen = (event) => {
    setMenuState(event.currentTarget)
  }

  const handleEditCampaign =(id)=> {
    setEditModal(true)
  }

  return (
    <>
      <Menu
        anchorEl={menuState}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={()=>handleEditCampaign(data.uid)}>Edit</MenuItem>
        <MenuItem style={{ color: "#e84a3f" }} onClick={()=>handleDeleteEvent(data.uid)}>
          Delete
        </MenuItem>
      </Menu>

      <Card sx={{ maxWidth: 600 }}>
        <CardHeader
          style={{ backgroundColor: "#e6e3e3" }}
          action={
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          }
          title={data.campaignName}
        />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {data.campaignType}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {data.dateRange["startDate"]} - {data.dateRange["endDate"]}
          </Typography>
        </CardContent>
      </Card>
      <EditEventModal state={editModal} handleClose={()=> setEditModal(false)} prefillData={data} />
    </>
  )
}
