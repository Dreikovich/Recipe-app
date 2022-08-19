import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import {cutString} from '../components/RandomRecipes'

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
    <div style={{display:"flex", justifyContent:"center",flexWrap: "wrap"}}>
        {category && category.map(element => (
            <Box  key={element.idCategory} maxWidth='400px'style={{marginRight:"100px", marginBottom:"50px"}}>
               
            <Card>
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
                        {cutString(element.strCategoryDescription)}
                    </Typography>

                </CardContent>
                

            </Card>

          </Box> 
        ))}
    </div>
  )
}

export default Category