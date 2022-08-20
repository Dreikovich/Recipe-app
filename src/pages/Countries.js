import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Box, Card, CardContent, Typography} from "@mui/material"

const Countries = () => {

    const [countries, setCountries] = useState()

    useEffect(() =>{
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(response=>{
            const data = response.data
            const {meals} = data
            setCountries(meals)
        })
        
    },[])
    console.log(countries)

  return (
    <Box sx={{display: 'flex', flexWrap:"wrap"}}>
            {countries && countries.map(country => (
                <Card style={{cursor: 'pointer',display:"flex", alignItems: 'center', justifyContent:'center'}} 
                        variant="outlined" 
                        sx={{ width: 150, height:100, margin:3}} 
                        onClick={()=>console.log("vdfvdfv")}>
                    <CardContent >
                        <Typography>{country.strArea}</Typography>
                    </CardContent>
                </Card>
            ))}

        
    </Box>
  )
}

export default Countries