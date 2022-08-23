import React from 'react'
import { Box,  Chip} from '@mui/material'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Tags = ({recipe}) => {
    let navigate = useNavigate()
    const onClickChipArea =(search) =>{
        console.log(search)
        navigate(`/countries/${search}`)
    }
    
    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    const onClickChipCategory = async (search)=>{
        await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search}`).then(res=>console.log(res.data))
        navigate(`/categories/${search}`)
        
    }

  return (
    <Box style={{ display: "flex", flexWrap:"wrap", marginTop:'4px'}}>
        <Chip onClick={()=>onClickChipCategory(recipe.strCategory)} style={{marginRight:"5px", marginBottom:"5px"}} label={recipe.strCategory}></Chip>
        <Chip onClick={()=>onClickChipArea(recipe.strArea)} style={{marginRight:"5px"}} label={recipe.strArea}></Chip>
    
        {recipe.strTags!==null? recipe.strTags.split(",").map((element, index)=>(
            <Chip key={generateKey(element)} color="primary" variant="outlined" style={{marginRight:"5px", marginBottom:"10px"}} label={`#${element}`}></Chip>
        )):null
        }
        
    </Box> 
  )
}

export default Tags