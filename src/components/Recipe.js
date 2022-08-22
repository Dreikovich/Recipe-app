import React from 'react'
import {useState, useEffect, useContext} from "react"
import Counter from "./Counter"
import RecommendedRecipe from './RecommendedRecipe'
import { Box,  ListItemText, Typography, Card, CardContent, Chip} from '@mui/material'
import {useParams} from 'react-router-dom'



import axios from "axios"

const Recipe = () => {
    
    const [mealDetail, setMealDetail] = useState()
    const [measure, setMeasure] = useState()
    const { id } = useParams()
   
    
    console.log(id)
    const findContent = (meal, search) =>{
        const arrayMeal = Object.entries(meal)
        //***mid level desctructurization
        const arrayIngredients = arrayMeal
            .filter(([key, value]) => key.includes(search) && value !== '')
            .map(([, value]) => value)
        return arrayIngredients
    }

    const getMeasures = ()=>{
        const arrayMeasures = findContent(mealDetail, 'strMeasure')
        console.log(arrayMeasures)
    }
    if(mealDetail){getMeasures()}
    
    useEffect(() =>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?apiKey=1&i=${id}`).then(res=>{
            const data = res.data
            const {meals} = data
            setMealDetail(meals[0])
        })
        window.scrollTo(0, 0);
        
    },[id])
    
    
    return (
        (mealDetail && 
            <Box >
                <div className="container" style={{display: 'flex', justifyContent: 'center'}}>  
                    <div className="leftContainer" style={{width:"800px"}}>
                        <Box sx={{ marginBottom:"10px", position:"relative"}}>
                            <Typography variant="h2" >{mealDetail.strMeal}</Typography>
                        </Box>
                        <Box
                            component="img"
                            sx={{
                            height: 550,
                            width: 800,
                            }}
                            alt="ImageRecipe"
                            src={mealDetail.strMealThumb}
                            
                        />
                          <div style={{display: "flex", flexWrap:"wrap"}}>
                            <Chip style={{marginRight:"5px", marginBottom:"5px"}} label={mealDetail.strCategory}></Chip>
                            <Chip style={{marginRight:"5px"}} label={mealDetail.strArea}></Chip>
                        
                            {mealDetail.strTags!==null? mealDetail.strTags.split(",").map((element, index)=>(
                                <Chip key={index} color="primary" variant="outlined"  style={{marginRight:"5px", marginBottom:"10px"}} label={`#${element}`}></Chip>
                            )):null
                            }
                            <br/>
                        </div>
                        <Box sx={{
                            marginTop:2
                            }}>
                            <Typography variant='h4'>Descriprions</Typography>
                            <Typography>{mealDetail.strInstructions}</Typography>
                        </Box>
                        <Box sx={{marginTop:"30px"}}>
                            <Typography variant='h4'>Related Recipes</Typography>
                            <RecommendedRecipe mealDetail={mealDetail}/>
                        </Box>
                      
                
                    </div>
                    <div style={{marginLeft:"40px", marginTop:"81px"}} className="RightContainer">
                        <Card>
                            <Typography variant="h4" align="center">Ingredients ({findContent(mealDetail,"strIngredient").length})</Typography>
                            <CardContent>
                                <Box component="div"  sx={{ display:"flex", marginTop:"20px"}}>
                                    <Box>
                                    {findContent(mealDetail,"strIngredient").map((element,index)=>(
                                        
                                        <ListItemText id={index} primary={element}/>
                                    ))}
                                    </Box>
                                    <Box sx={{marginLeft:"50px"}} >
                                    {findContent(mealDetail,"strMeasure").map((element,index)=>(
                                        <ListItemText id={index} primary={element}></ListItemText>
                                    ))}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                        <Counter />
                        
                    </div>

                </div>
            </Box> 
        
        )
    )
}

export default Recipe