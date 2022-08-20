import React from 'react'
import {useState, useEffect} from 'react'
import CardRowCategory from"./CardRowCategory"
import axios from "axios"

const ListRecipesByCategory = ({urlCategory}) => {
    const [recipesByCategory, setRecipesByCategory] = useState()
    const getData = async()=>{
        await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${urlCategory}`).then(res=>{
            const data = res.data
            const {meals} = data
            setRecipesByCategory(meals) 
        })
    }

    useEffect(() =>{
        getData()

    },[])

    console.log(recipesByCategory)
  return (
    <CardRowCategory recipesByCategory={recipesByCategory}/>
  )
}

export default ListRecipesByCategory