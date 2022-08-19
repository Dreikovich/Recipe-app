import React from 'react';

import {Box, AppBar, Menu, MenuItem, Typography, IconButton, Toolbar} from "@mui/material"

import MenuIcon from '@mui/icons-material/Menu';

import {useContext} from 'react'
import AppContext from '../context'

const Header = () => {

  const {setIsClickMenu} = useContext(AppContext)

  return (
    <Box style={{marginBottom: '50px'}}>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>setIsClickMenu(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe App
          </Typography>
          
              {/* <Menu
                id="menu-appbar"      
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem> */}
              {/* </Menu> */}
            
          
        </Toolbar>
        </AppBar>
      
    </Box>
  )
}

export default Header