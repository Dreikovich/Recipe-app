import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Box, Card, CardContent,CardMedia, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"

const Countries = () => {

    const [countries, setCountries] = useState()
    let navigate = useNavigate()
   

    Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
    }

    const getImagesFromApi = async (query)=>{
        
        const res = await axios.get(`https://api.pexels.com/v1/search?apiKey=563492ad6f91700001000001070cc20509c34c398a2ae176d97c2503&query=${query}`)
        const data = res.data
        const { photos } = data
        
        return photos[1].src.medium
    }
  
    const onClickCard=(value)=>{
        navigate(`/countries/${value}`)
    }

    useEffect(() => {
        axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then(async response=>{
            const data = response.data
            let {meals} = data
            console.log(meals)
            meals = await Promise.all(meals.map(async meal => {
                const imageUrl = await getImagesFromApi(meal.strArea)
                return ({
                    ...meal,
                    imageUrl,
                })
            }))
            console.log(meals)
            setCountries(meals)
        })
        // getImagesFromApi("America")
    },[])
    

  return (
    <Box sx={{display: 'flex', flexWrap:"wrap"}}>
            {countries && countries.map(country => (
                <Card style={{cursor: 'pointer',display:"flex", alignItems: 'center', justifyContent:'center', flexDirection: 'column'}} 
                        variant="outlined" 
                        sx={{ width: 250, height:200, margin:3}} 
                        onClick={()=>onClickCard(country.strArea)}>
                    <CardContent >
                        <Typography>{country.strArea}</Typography>
                    </CardContent>
                    <img width={250} height={150}src={country.imageUrl} alt="country" />
                </Card>
            ))}

        
    </Box>
  )
}

export default Countries