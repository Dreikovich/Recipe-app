import React from 'react'
import {useState, useEffect} from 'react'
import{Box, Card, CardContent, CardMedia, Typography, CardActions, Button} from '@mui/material'


const cutString = (text) =>{
    const cut = text.substr(0,70)
    return cut+"..."
}



const RandomRecipes = () => {

    const [randomRecipes, setRandomRecipes] = useState()

    useEffect(()=>{
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?apiKey=1&s=')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        setRandomRecipes(data.meals)
    });
    },[])
    console.log(randomRecipes)


    return (
        <div style={{display: "flex", justifyContent:"center", flexDirection: "row", flexWrap:"wrap"}}>
           {randomRecipes && randomRecipes.map((recipe) =>(
              <Box maxWidth='400px'style={{marginRight:"100px", marginBottom:"50px"}}>
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
                        <Button size="small">See more...</Button>
                    </CardActions>

                </Card>

              </Box> 
            ))
           }
        </div>
    )
}

export default RandomRecipes