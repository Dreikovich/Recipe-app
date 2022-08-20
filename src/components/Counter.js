import React from 'react'
import {useState} from 'react'
import { Button , Typography} from '@mui/material'


const Counter = () => {
    const [counter, setCounter] = useState(0);
  return (
    <div style={{display: 'flex', alignItems: 'center', gap:"10px", marginTop:"20px"}}>
        <Button variant="outlined">-</Button>
        <Typography>{counter}</Typography>
        <Button variant="outlined">+</Button>
    </div>
  )
}

export default Counter