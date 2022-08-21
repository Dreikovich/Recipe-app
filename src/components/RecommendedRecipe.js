import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Box, Card, CardMedia, CardActions, CardContent, Button, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useRef} from 'react-router-dom' 
 
const RecommendedRecipe = ({mealDetail}) => {
    let navigate = useNavigate()
    const [recipes, setRecipes] = useState()

    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }

    const getRecipes = async () =>{
        try{
            const resArea = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealDetail.strArea}`)
            const resCategory = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealDetail.strCategory}`)
            setRecipes([...resCategory.data.meals, ...resArea.data.meals])
        }catch(err){
            console.log(err.message)
        }  
    }

    const getSixRandomRecipes = () =>{
        let randomSix = []
        if(recipes){
            for(let i=0;i<6;i++){
                randomSix = [...randomSix, recipes.random()]
            }
            return randomSix
        }
        else return null
        
    }

    console.log(recipes)

    const onShowRecipe = (id) =>{
        console.log(id)
        navigate(`/recipe/${id}`)
    }

    const relatedReciipes = getSixRandomRecipes() 
    
    

    useEffect(() =>{
        
        getRecipes()

    },[])
    return (
        <Box sx={{display: 'flex', flexWrap:"wrap", gap:"22px",marginTop:"15px"}}>
            {relatedReciipes && relatedReciipes.map(element =>(
                <Card  sx={{ maxWidth: 240, maxHeight:400, position:"relative" }}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={element.strMealThumb}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {element.strMeal}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Button style={{position: 'absolute', bottom: '0px'}} onClick={()=>onShowRecipe(element.idMeal)} size="small">Show ...</Button>
                    </CardActions>
                    </Card>
            ))}
        </Box>
    )
    }

export default RecommendedRecipe