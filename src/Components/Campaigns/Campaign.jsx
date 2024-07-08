import React, { createContext, useState } from "react"
import EventCard from "./EventCard"
import styles from  "./CSS/Campaign.module.css"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import CreateEventModal from "./CreateEventModal"


export const campaignContext = createContext()

export default function Campaign() {
  const [createEventModal, setEventModal] = useState(false)
  const [campaignData, setCampaignData] = useState([])

  const handleSubmitEvent = (eventData) => {
    setCampaignData((prevData) => ([...prevData, eventData]))
    console.log("Event", eventData)
  }

  const handleDeleteEvent = (id) => {
    const filteredItems = campaignData.filter((item) => item.uid !== id)
    setCampaignData(filteredItems)
  }

  const handleCreateEvent = () => {
    setEventModal(true)
  }

  const handleCloseEventModal = () => {
    setEventModal(false)
  }

  return (
    <React.Fragment>
      <campaignContext.Provider value={{ campaignData, setCampaignData }}>
        <Container fixed>
          <div className={styles.campaignHeader} >
            <Button variant="outlined" onClick={handleCreateEvent}>
              Create Event
            </Button>
          </div>
          <div className={styles.campaignCardGrid} >
            {campaignData && campaignData.map((item, index) => <EventCard key={index} data={item} handleDeleteEvent={handleDeleteEvent} />)}
          </div>
          <CreateEventModal state={createEventModal} handleSubmitEvent={handleSubmitEvent} handleClose={handleCloseEventModal} />
        </Container>
      </campaignContext.Provider>
    </React.Fragment>
  )
}
