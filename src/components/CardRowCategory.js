import React from 'react'
import { styled } from '@mui/material/styles';
import {Box,  Typography, Button, Grid} from '@mui/material'
import Paper from '@mui/material/Paper';
import AppContext from "../context"
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import Description from './Description';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '400px',
    maxHeight: '180px',
  });

const CardRowCategory = ({recipes}) => {

    let navigate = useNavigate()


    const onShowRecipe = (id)=>{
      navigate(`/recipe/${id}`)
    }

    return (
    <Box>
      {recipes && recipes.map(element =>(  
          <Paper  key={element.idMeal}
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 800,
              flexGrow: 1,
              marginBottom: '20px'
            }}
          >  
            <Grid container spacing={2}>
              <Grid item>
                  <Img  alt="complex" src={element.strMealThumb} />
                
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography variant="h4">{element.strMeal}</Typography>
                  </Grid>
                  <Grid item >
                    <Description id = {element.idMeal} count = {300}/>
                  </Grid>
                  <Grid item>
                    <Button onClick={()=>onShowRecipe(element.idMeal)}>Show Recipe</Button>
                  </Grid>
                 
                </Grid>
                
              </Grid>
            </Grid>
          </Paper>
      ))}
        
    </Box>
   
    
  )
}

export default CardRowCategory