import React from 'react'
import YouTube from 'react-youtube';
import {useState, useEffect, useContext} from "react"
import RecommendedRecipe from './RecommendedRecipe'
import { Box,  ListItemText, Typography, Card, CardContent, Chip} from '@mui/material'
import {useParams} from 'react-router-dom'
import axios from "axios"
import Tags from './Tags'
import { Construction } from '@mui/icons-material';

const Recipe = () => {
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      };
    
    const [mealDetail, setMealDetail] = useState()
    const [measure, setMeasure] = useState()
    const { id } = useParams()
    const [idUrl, setIdUrl] = useState()

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

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    const getJoinedIngredients = () =>{
        let joinedIngredientsMeasure = []
       
        for(let i=0; i<findContent(mealDetail,"strIngredient").length;i++){
            let ingredient = findContent(mealDetail,"strIngredient")[i]
            let measure = findContent(mealDetail,"strMeasure")[i]
            joinedIngredientsMeasure  = [...joinedIngredientsMeasure , {ingredient, measure}]
        }
        return joinedIngredientsMeasure 
    }
    if(mealDetail){
        getJoinedIngredients()
    }

    
    
    useEffect(() =>{
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?apiKey=1&i=${id}`).then(res=>{
            const data = res.data
            const {meals} = data
            const value = meals[0].strYoutube.split('v=')[1]
            meals[0] = {...meals[0], idUrl:value}
            setMealDetail(meals[0])
            
        })
        window.scrollTo(0, 0);
        
    },[id])
    
    
    return (
        (mealDetail && 
            <Box >
                <Box className="container" sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}} >  
                    <Box className="leftContainer" style={{display:"flex", justifyContent: 'center', flexDirection: 'column', width: '800px'}}>
                        <Box sx={{ marginBottom:"10px", order:"0", order:"0"}}>
                            <Typography variant="h2" >{mealDetail.strMeal}</Typography>
                        </Box>
                        <Box
                            
                            component="img"
                            sx={{
                            maxHeight: 550,
                            maxWidth: '100%',
                            ,
                            
                            }}
                            alt="ImageRecipe"
                            src={mealDetail.strMealThumb}
                        />
                          
                        <Box sx={{order:"0", marginBottom:"20px", marginTop:'20px'}}>
                            <Box className="RightContainer">
                           
                                <Card style={{display:"flex", flexDirection:"column"}}>
                                    <Typography  variant="h4">Ingredients ({findContent(mealDetail,"strIngredient").length})</Typography>
                                    <CardContent>
                                        <Box component="div"  sx={{ display:"flex", flexDirection:"column"}}>
                                            { getJoinedIngredients().map((element, index)=>(
                                                element.ingredient!=null?
                                                <Box key={index} sx={{width:"100%",display:"flex", justifyContent:"space-between"}}>
                                                <ListItemText style={{flexGrow: '0'}}   primary={element.ingredient} />
                                                <Box sx={{flex: "1 1 0", borderBottom:"1px dotted rgb(0, 0, 0)", position:"relative", top:"-10px"}}></Box>
                                                <ListItemText style={{flexGrow: '0'}}   primary={element.measure} />
                                            </Box>:null
                                                
                                            ))}
                                        </Box>
                                       
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                        <Box sx={{
                            marginTop:2,
                            order:"0",
                            order:"0"
                            }}>
                            <Typography variant='h4'>Descriprions</Typography>
                            <Typography>{mealDetail.strInstructions}</Typography>
                        </Box>
                        <Tags recipe={mealDetail}/>
                        <Box>
                            <Typography variant='h4'>YT Video</Typography>
                            <YouTube videoId={mealDetail.idUrl}  opts={opts}  />;
                        </Box>
                        
                        <Box sx={{marginTop:"30px", order:"2"}}>
                            <Typography variant='h4'>Related Recipes</Typography>
                            <RecommendedRecipe mealDetail={mealDetail}/>        
                        </Box>
                        
                    </Box>
                </Box>   
            </Box> 
        )
    )
}

export default Recipe