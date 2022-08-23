import React from 'react'
import {useState, useEffect, useContext} from "react"
import RecommendedRecipe from './RecommendedRecipe'
import { Box,  ListItemText, Typography, Card, CardContent, Chip} from '@mui/material'
import {useParams} from 'react-router-dom'



import axios from "axios"

const Recipe = () => {
    
    const [mealDetail, setMealDetail] = useState()
    const [measure, setMeasure] = useState()
    const { id } = useParams()
   

    const findContent = (meal, search) =>{
        const arrayMeal = Object.entries(meal)
        //***mid level desctructurization
        const arrayIngredients = arrayMeal
            .filter(([key, value]) => key.includes(search) && value !== '')
            .map(([, value]) => value)
        return arrayIngredients
    }

    // const getMeasures = ()=>{
    //     const arrayMeasures = findContent(mealDetail, 'strMeasure')
    //     console.log(arrayMeasures)
    // }
    // if(mealDetail){getMeasures()}
    
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
                <Box className="container" sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}} >  
                    <Box className="leftContainer" style={{display:"flex", justifyContent: 'center', flexDirection: 'column', width: '800px'}}>
                        <Box sx={{ marginBottom:"10px"}}>
                            <Typography variant="h2" >{mealDetail.strMeal}</Typography>
                        </Box>
                        <Box
                            
                            component="img"
                            sx={{
                            marginBottom:"10px",
                            maxHeight: 550,
                            maxWidth: '100%'
                            }}
                            alt="ImageRecipe"
                            src={mealDetail.strMealThumb}
                            
                            
                        />
                          <Box sx={{display: "flex", flexWrap:"wrap", marginTop:'15px'}}>
                            <Chip style={{marginRight:"5px", marginBottom:"5px"}} label={mealDetail.strCategory}></Chip>
                            <Chip style={{marginRight:"5px"}} label={mealDetail.strArea}></Chip>
                        
                            {mealDetail.strTags!==null? mealDetail.strTags.split(",").map((element, index)=>(
                                <Chip key={index} color="primary" variant="outlined"  style={{marginRight:"5px", marginBottom:"10px"}} label={`#${element}`}></Chip>
                            )):null
                            }
                            <br/>
                        </Box>
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
                      
                
                    </Box>
                    <Box style={{ marginLeft:"40px", marginTop:"81px"}} className="RightContainer">
                        <Card style={{display:"flex", flexDirection:"column"}}>
                            <Typography variant="h4" align="center">Ingredients ({findContent(mealDetail,"strIngredient").length})</Typography>
                            <CardContent>
                                <Box component="div"  sx={{ display:"flex", marginTop:"20px"}}>
                                    <Box>
                                    {findContent(mealDetail,"strIngredient").map((element,index)=>(
                                        
                                        <ListItemText key={index} id={index} primary={element}/>
                                    ))}
                                    </Box>
                                    <Box sx={{marginLeft:"50px"}} >
                                    {findContent(mealDetail,"strMeasure").map((element,index)=>(
                                        <ListItemText key={index} id={index} primary={element}></ListItemText>
                                    ))}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>

                    </Box>
                        
                        
                </Box>
                    
            </Box> 
        
        )
    )
}

export default Recipe