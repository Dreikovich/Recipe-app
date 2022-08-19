import React from 'react'
import {useState, useEffect, useContext} from "react"
import {List, Box, Grid, ListItemText} from '@mui/material'

import AppContext from "../context"
import axios from "axios"
import ListItem from '@mui/material/ListItem';


const Recipe = () => {
    
    const {idMeal} = useContext(AppContext)
    const [mealDetail, setMealDetail] = useState()


    
    const findContent = (meal, search) =>{
        const arrayMeal = Object.entries(meal)
        //***mid level desctructurization
        const arrayIngredients = arrayMeal
            .filter(([key, value]) => key.includes(search) && value !== '')
            .map(([, value]) => value)
        return arrayIngredients
    }

    
    useEffect(() =>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?apiKey=1&i=${idMeal}`).then(res=>{
            const data = res.data
            const {meals} = data
            setMealDetail(meals[0])
        })
    },[])
    
    
    return (
        (mealDetail && 
        <div className="container" style={{display: 'flex', justifyContent: 'center'}}>       
            <div className="leftContainer">
                
                <Box
                    component="img"
                    sx={{
                    height: 350,
                    width: 500,
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                    }}
                    alt="ImageRecipe"
                    src={mealDetail.strMealThumb}
                />
            </div>
            <div className="RightContainer">
                <Grid container
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start">

                    <Grid item >
                        <List sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        
                        }}>
                            <ListItem style={{display:"flex", justifyContent:"start",flexDirection:"column"}}>
                                {findContent(mealDetail,"strIngredient").map((element,index)=>(
                                    
                                        <ListItemText  id={index} primary={element}/>
                                    
                                ))}
                            </ListItem>
                        </List>
                    
                        
                    </Grid>
                    
                </Grid>
            </div>
            
            
        </div>)
        
    )
}

export default Recipe