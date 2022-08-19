import React from 'react'
import {useState, useEffect, useContext} from 'react'
import{Box, Card, CardContent, CardMedia, Typography, CardActions, Button, Chip} from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import AppContext from '../context'


export const cutString = (text) =>{
    const cut = text.substr(0,120)
    return cut+"..."
}



const RandomRecipes = () => {
    const {setIdMeal} = useContext(AppContext)
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

    const onClickRecipe = async (id) =>{
        setIdMeal(id)
        navigate(`/recipe/${id}`)
    } 


    return (
        <div style={{display: "flex", justifyContent:"center", flexDirection: "row", flexWrap:"wrap"}}>
           {randomRecipes && randomRecipes.map((recipe) =>(
            
              <Box  key={recipe.idMeal} maxWidth='400px'style={{marginRight:"100px", marginBottom:"50px"}}>
               
                <Card>
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
                            {cutString(recipe.strInstructions)}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={()=>onClickRecipe(recipe.idMeal)}>See more...</Button>
                        
                    </CardActions>
                    <div style={{marginLeft: "10px", display: "flex", flexWrap:"wrap"}}>
                        <Chip style={{marginRight:"5px", marginBottom:"5px"}} label={recipe.strCategory}></Chip>
                        <Chip style={{marginRight:"5px"}} label={recipe.strArea}></Chip>
                    
                        {recipe.strTags!==null? recipe.strTags.split(",").map(element=>(
                            <Chip style={{marginRight:"5px", marginBottom:"10px"}} label={element}></Chip>
                        )):null
                        }
                        <br/>
                    </div>
                    
                       
                       
                    
                    

                </Card>

              </Box> 
            ))
           }
        </div>
    )
}

export default RandomRecipes