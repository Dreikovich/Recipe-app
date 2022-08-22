import React from 'react'
import {Drawer, Box ,  List, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { useContext } from 'react'
import AppContext from "../context"
import {useNavigate} from 'react-router-dom'

const DrawerMenu = () => {
  let navigate = useNavigate()

  const {isClickMenu, setIsClickMenu} = useContext(AppContext)
  const itemList  = [
    {name:"Home", onClick: () =>navigate("Recipe-app", { replace: true })},
    {name:"Categories", onClick: () =>navigate("/categories", { replace: true })},
    {name:"Countries", onClick: () =>navigate("/countries", { replace: true })},
    // {name:"Countries", onClick: () =>navigate("countries")},
    // {name:"Settings", onClick: () =>navigate("settings")}
    
  ]
  return (
    
    
    <Drawer anchor="left" open={isClickMenu} onClose = {()=>setIsClickMenu(false)}>
        <Box p={2} width="250px" textAlign="center" role="presentation">
        <List>
        {itemList.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={text.onClick}>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
        </Box>

    </Drawer>
  )
}

export default DrawerMenu