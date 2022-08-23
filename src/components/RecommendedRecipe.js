import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Box, Card, CardMedia, CardActions, CardContent, Button, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import Description from './Description'

 
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

    const searchObj = (id)=>{
        const filteredRecipes = recipes.filter(({idMeal})=> id===idMeal )
        return filteredRecipes[0]

    }


    const getSixRandomRecipes = () =>{
        let randomSix = []
        let result = []
        let recommended = []
        if(recipes && mealDetail){
               while(result.length!==6){
                randomSix = [...randomSix, recipes.random()]
                    const countItems = randomSix.reduce((acc, {idMeal}) => {
                        if(idMeal!==mealDetail.idMeal){
                            acc[idMeal] = acc[idMeal] ? acc[idMeal] + 1 : 1;
                            return acc;
                        }
                        else {
                            return {}
                        } 
                    }, {});
                    result = Object.keys(countItems).filter((item) => countItems[item] = 1)

               }
               result.map((id) => {
                    recommended = [...recommended, searchObj(id)]
               })
               return recommended   
        }
        else return null
        
    }


    const onShowRecipe = (id) =>{
        navigate(`/recipe/${id}`)
    }

    const relatedReciipes = getSixRandomRecipes() 

    useEffect(() =>{
        
        getRecipes()

    },[])
    return (
        <Box sx={{display: 'flex',justifyContent: 'center', flexWrap:"wrap", gap:"30px",marginTop:"15px"}}>
            {relatedReciipes && relatedReciipes.map((element, index) =>(
                <Card onClick={()=>onShowRecipe(element.idMeal)} key={element.strMeal} sx={{width:380, maxWidth: 440, maxHeight:420, position:"relative" ,cursor: 'pointer'}}>
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
                        <Description id = {element.idMeal} count={50}/>
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