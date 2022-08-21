import React from 'react'
import {useState, useEffect, useContext} from 'react'
import{Box, Card, CardContent, CardMedia, Typography, CardActions, Button, Chip} from '@mui/material'
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

    const onClickChipCategory = async (search)=>{
        await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`).then(res=>console.log(res.data))
        navigate(`/categories/${search}`)
        
    }

    const onClickChipArea =(search) =>{
        console.log(search)
        navigate(`/countries/${search}`)
    }
    

    const onClickRecipe = (id) =>{
        navigate(`/recipe/${id}`)
    } 

    // const onClickChipTag = (search)=>{
    //     navigate(`/tags/${search}`)
    // }


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
                            {cutString(recipe.strInstructions, 120)}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={()=>onClickRecipe(recipe.idMeal)}>See more...</Button>
                    </CardActions>
                    <Box style={{marginLeft: "10px", display: "flex", flexWrap:"wrap"}}>
                        <Chip onClick={()=>onClickChipCategory(recipe.strCategory)} style={{marginRight:"5px", marginBottom:"5px"}} label={recipe.strCategory}></Chip>
                        <Chip onClick={()=>onClickChipArea(recipe.strArea)} style={{marginRight:"5px"}} label={recipe.strArea}></Chip>
                    
                        {recipe.strTags!==null? recipe.strTags.split(",").map(element=>(
                            <Chip color="primary" variant="outlined" style={{marginRight:"5px", marginBottom:"10px"}} label={`#${element}`}></Chip>
                        )):null
                        }
                        
                    </Box> 
                </Card>
              </Box> 
            ))
           }
        </div>
    )
}

export default RandomRecipes