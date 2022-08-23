import React from 'react'
import {useState, useEffect, useContext} from 'react'
import{Box, Card, CardContent, CardMedia, Typography, CardActions, Button, Chip} from '@mui/material'
import Tags from './Tags'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AppContext from '../context'


export const cutString = (text, count) =>{
    const cut = text.substr(0,count)
    return cut+"..."
}




const RandomRecipes = () => {
    const {} = useContext(AppContext)
    let navigate = useNavigate()

    const [randomRecipes, setRandomRecipes] = useState()
   

    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?apiKey=1&s=')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        setRandomRecipes(data.meals)
    });
    },[])

    

    const onClickRecipe = (id) =>{
        navigate(`/recipe/${id}`)
    } 

    // const onClickChipTag = (search)=>{
    //     navigate(`/tags/${search}`)
    // }


    return (
        <div style={{display: "flex", justifyContent:"center", flexDirection: "row", flexWrap:"wrap", gap:"25px"}}>
           {randomRecipes && randomRecipes.map((recipe) =>(
              <Box style={{display: "flex", justifyContent:"center"}}  key={recipe.idMeal} maxWidth='400px'>
                <Card sx={{cursor: "pointer", position: "relative"}} onClick={()=>onClickRecipe(recipe.idMeal)}>
                    <CardMedia 
                    component="img"
                    height="150px"
                    image={recipe.strMealThumb}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {recipe.strMeal}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {cutString(recipe.strInstructions, 120)}
                        </Typography>
                        <Tags recipe={recipe}></Tags>
                    </CardContent>
                    <CardActions>
                        <Button style={{position: 'absolute', bottom: '0px'}}  size="small" onClick={()=>onClickRecipe(recipe.idMeal)}>See more...</Button>
                    </CardActions>
                    
                </Card>
              </Box> 
            ))
           }
        </div>
    )
}

export default RandomRecipes