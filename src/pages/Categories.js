import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import {cutString} from '../components/RandomRecipes'
import {Link} from "react-router-dom"


import{Box, Card, CardContent, CardMedia, Typography, CardActions, Button} from '@mui/material'



const Category = () => {
    const [category, setCategory] = useState()
    

    const getCategoryList = async () =>{
        await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php?apiKey=1").
        then(res=>{
            const data = res.data;
            const {categories} = data
            setCategory(categories)
            // setCategory(categories)
        })
    }
    useEffect(() =>{
        getCategoryList()
        
    },[])
    // console.log(category)

  return (
    <Box sx={{display:"flex", justifyContent:"center", flexWrap: "wrap", gap:"25px"}}>
        {category && category.map(element => (
            <Box  key={element.idCategory} style={{width:'400px', height:'400px'}}>
                <Link to={`/categories/${element.strCategory}`} style={{textDecoration:"none"}}>
                    <Card >
                        <CardMedia 
                        component="img"
                        height="200px"
                        image={element.strCategoryThumb}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {element.strCategory}
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary">
                                {cutString(element.strCategoryDescription, 140)}
                            </Typography>

                        </CardContent>
                    </Card>
                </Link>
            
          </Box> 
        ))}
    </Box>
  )
}

export default Category