import React from 'react'
import {Box, Container, Grid, Link, Typography} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Footer = () => {
  return (
    <Box sx={{ backgroundColor:'#2E3B55', marginTop: '30px', color:'#FFFFFF' }}>
      <Container maxWidth="lg" >
        <Grid container spacing={1}  direction="row" justifyContent="center"   >
          <Grid item xs={6} sm={6} md={6}  >
            <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
              <Box component='h3' sx={{borderBottom:"1px solid #FFFFFF"}}>Contact</Box>
                <Box sx={{marginTop: '15px', display: 'flex', flexDirection: 'column'}}>
                  <Box sx={{ display: 'flex'}}>
                    <EmailIcon/>
                    <Link href="mailto:andrzejhk@gmail.com" style={{marginLeft:"5px"}} color="inherit">
                    andrzejhk@gmail.com
                    </Link>
                  </Box>
                  <Box sx={{marginTop: '5px', display: 'flex'}}>
                    <GitHubIcon/>
                    <Link href="https://github.com/drewkevich" style={{marginLeft:"5px"}} color="inherit">
                      Github
                    </Link>
                  </Box>
                  <Box sx={{marginTop: '5px', display: 'flex'}}>
                    <PhoneIcon />
                    <Typography style={{marginLeft:"5px"}} color="inherit">
                      +48577776746
                    </Typography>
                  </Box>
                  <Box sx={{marginTop: '5px', display: 'flex', marginBottom: '20px'}}>
                    <LocationOnIcon />
                    <Typography style={{marginLeft:"5px"}} color="inherit">
                      Warsaw
                    </Typography>
                  </Box>
              </Box>
             
            </Box>
            
          </Grid>
          <Grid item xs={6} sm={6} md={6}>
            <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
              <Box component='h3' sx={{borderBottom:"1px solid #FFFFFF"}}>Created using</Box>
              <Box sx={{marginTop: '15px', display: 'flex', flexDirection: 'column'}}>
                <Box>
                  <Typography>React </Typography>
                </Box>
                
                <Typography style={{marginTop: '5px'}}>Material-UI</Typography>
                <Typography style={{marginTop: '5px'}}>TheMealDB Api</Typography>
                <Typography style={{marginTop: '5px'}}>Pixabay Api</Typography>
              </Box>
            </Box>
            
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}

export default Footer