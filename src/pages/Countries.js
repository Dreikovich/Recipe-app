import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {Box, Card, CardContent,CardMedia, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"



const Countries = () => {

    const [countries, setCountries] = useState()
    let navigate = useNavigate()
   
    //! method random
    // Array.prototype.random = function () {
    //     return this[Math.floor((Math.random()*this.length))];
    // }
   
    //********** function for pexels api
    // const getImagesFromApi = async (query)=>{
    //     try{
    //         const res = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`,{
    //         headers: {
    //             "Authorization": "563492ad6f91700001000001070cc20509c34c398a2ae176d97c2503",
                
    //         }})
    //         const data = res.data
    //         const { photos } = data
            
    //         return photos[0].src.small
    //     }
    //     catch(err){
    //         console.log(err.message)
    //     }
    // }

    const getImagesFromApi = async (query) =>{
        try{
            const res = await axios.get(`https://pixabay.com/api/?key=29412461-234e7bb3280c2c60ab6aa5601&q=${query}+flag`)
            const data = res.data
            const { hits } = data
            return hits[0].webformatURL
        }
        catch(err){
            console.log(err)
        }
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
        
    },[])
    

  return (
    <Box sx={{display: 'flex', flexWrap:"wrap"}}>
            {countries && countries.map(country => (
                <Card style={{cursor: 'pointer',display:"flex", alignItems: 'center', justifyContent:'center', flexDirection: 'column'}} 
                        variant="outlined" 
                        sx={{ width: 250, height:220, margin:3}} 
                        onClick={()=>onClickCard(country.strArea)}>
                    <CardContent style={{width:"100%", borderBottom: "2px solid #e9e9e9" ,backgroundColor:"#e9e9e9"}}>
                        <Typography >{country.strArea}</Typography>
                    </CardContent >
                    <img  width={250} height={170} src={country.imageUrl} alt="country" />
                </Card>
            ))}

        
    </Box>
  )
}

export default Countries