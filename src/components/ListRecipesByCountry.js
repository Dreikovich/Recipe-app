import React from 'react'
import {useState, useEffect} from 'react'
import CardRowCategory from"./CardRowCategory"
import axios from "axios"
import {useParams} from 'react-router-dom'



const ListRecipesByCountry = () => {
    const [recipesByCountries, setRecipesByCountries] = useState()
    const { country  } = useParams()
    console.log(country)
    const getData = async()=>{
      
        await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`).then(res=>{
            const data = res.data
            const {meals} = data
            setRecipesByCountries(meals) 
        })
    }

    useEffect(() =>{
        getData()
    },[])

    console.log(recipesByCountries)
  return (
    <div>
        <CardRowCategory recipes ={recipesByCountries}/>
    </div>
  )
}

export default ListRecipesByCountry