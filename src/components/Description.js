import React from 'react'
import {useState, useEffect} from 'react'
import {Typography} from '@mui/material'
import axios from 'axios'
import {cutString} from './RandomRecipes'

const Description = ({id}) => {
    const [mealInfo, setMealInfo] =  useState()

    const getData = async () =>{
        await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) =>{
            const data = response.data
            const {meals} = data;
            setMealInfo(meals)

        })
    }
    

    useEffect(() =>{
        getData()
    },[id])

    console.log()
  return (
    <div>
        {mealInfo && <Typography>{cutString(mealInfo[0].strInstructions, 300)}</Typography>}
        
    </div>
  )
}

export default Description