
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField"
import {useEffect} from 'react'
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton'
import ListSubheader from '@mui/material/ListSubheader'


import React from 'react'
import axios from "axios";

const SearchBar = () => {

   

    const [searchValue, setSearchValue] = useState()
    const [recipe, setRecipe] = useState()
    const [open, setOpen] = useState(false)

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
    console.log(recipe)

    const onInputChange = (e) =>{
        setSearchValue(e.target.value)
        
        
    }
    console.log(recipe)
    

    useEffect(() => {
        get()

    },[searchValue])

    return (
    
        <form style={{display: 'flex', alignItems: 'center', position: 'relative'}}>
            
                <input style={{height:"30px",width:"200px"}} type="text" placeholder="Search.." name="search" onChange={(e)=>onInputChange(e)}/>
                <SearchIcon />
                
            
                <List sx={{display:"flex", flexDirection:"column", justifyContent: "center", 
                                position: 'absolute', top: '0', marginTop: '42px',
                                 backgroundColor:"white",
                                 overflow: 'auto',
                                 maxHeight: 300,
                                }}
                                subheader={searchValue && recipe!==null?<ListSubheader>Search Results</ListSubheader>:null}>
                    {searchValue && recipe && recipe.map((value)=>(
                        <ListItemButton style={{ width:"200px", marginTop:"5px", position: "relative" }}>
                            <ListItemText style={{color:"black"}}primary={value.strMeal}/> 
                        </ListItemButton>
                        
                        )
                        
                    )}
                </List>
            
        </form>
    );
  
}

export default SearchBar

