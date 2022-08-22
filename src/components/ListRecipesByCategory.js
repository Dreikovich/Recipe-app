import React from 'react'
import {useState, useEffect} from 'react'
import CardRowCategory from"./CardRowCategory"
import axios from "axios"
import {useParams} from 'react-router-dom'

const ListRecipesByCategory = () => {

    const [recipesByCategory, setRecipesByCategory] = useState()
    const { category } = useParams()
    const getData = async()=>{
      
        await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then(res=>{
            const data = res.data
            const {meals} = data
            setRecipesByCategory(meals) 
        })
    }

    useEffect(() =>{
        getData()

    },[])

  return (
    <CardRowCategory recipes={recipesByCategory}/>
  )
}

export default ListRecipesByCategory