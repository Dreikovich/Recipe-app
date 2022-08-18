import React from 'react'
import {Drawer, Box , Typography, List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useContext } from 'react'
import AppContext from "../context"

const DrawerMenu = () => {

  const {isClickMenu, setIsClickMenu} = useContext(AppContext)
  
  return (
    
    <Drawer anchor="left" open={isClickMenu} onClose = {()=>setIsClickMenu(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
        <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        </Box>

    </Drawer>
  )
}

export default DrawerMenu