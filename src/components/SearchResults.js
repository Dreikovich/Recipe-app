import React from 'react'
import { useParams } from "react-router-dom"
import {useState, useEffect} from 'react'
import CardRowCategory from './CardRowCategory'
import axios from 'axios'

const SearchResults = () => {
    const {searchValue} = useParams()
    const [recipe, setRecipe] = useState()

    const getData = async ()=>{
        const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        const {meals} = res.data
        console.log(meals)
        if(meals){
            setRecipe(meals)
        }
        else{
            setRecipe(null)
        } 
    }
    useEffect(() =>{
        getData()
    },[searchValue])

    console.log(recipe)
  return (
    <div>
        
        {recipe? <CardRowCategory recipes={recipe}/>: <h1>No recipes found by request {searchValue}</h1>}
    </div>
    
  )
}

export default SearchResults