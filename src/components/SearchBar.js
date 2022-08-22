
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField"
import {useEffect} from 'react'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'
import {useNavigate} from 'react-router-dom'


import React from 'react'
import axios from "axios";

const SearchBar = () => {

    let navigate = useNavigate()
    const [searchValue, setSearchValue] = useState()
    const [recipe, setRecipe] = useState()
    const [close, setClose] = useState(false)

    const get = async ()=>{
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

    const onSubmit = (e) =>{
        e.preventDefault()
        navigate(`/search/${searchValue}`)
    }
   
    const onInputChange = (e) =>{
        setSearchValue(e.target.value)    
        setClose(false)
    }

    const onClickItem = (id, name) =>{
        setSearchValue(name)
        setClose(true)
        navigate(`/recipe/${id}`)
    }
    
    useEffect(() => {
        get()

    },[searchValue])

    return (
    
        <form style={{display: 'flex', alignItems: 'center', position: 'relative'}} onSubmit={onSubmit}>
                <input value={searchValue} style={{height:"30px",width:"200px"}} type="text" placeholder="Search.." name="search" onChange={(e)=>onInputChange(e)}/>
                <SearchIcon />
                {!close && 
                    <List sx={{display:"flex", flexDirection:"column",  
                        position: 'absolute', top: '0', marginTop: '42px',
                        backgroundColor:"white",
                        overflow: 'auto',
                        maxHeight: 300,
                    }}
                    subheader={searchValue && recipe!==null?<ListSubheader>Search Results</ListSubheader>:null}>
                    {searchValue && recipe && recipe.map((value)=>(
                        <ListItemButton onClick={()=>onClickItem(value.idMeal, value.strMeal)} style={{ width:"200px", position: "relative" }}>
                            <ListItemText style={{color:"black"}}primary={value.strMeal}/> 
                        </ListItemButton>
                        )
                        
                    )}
                </List>
                }
                
            
        </form>
    );
  
}

export default SearchBar

