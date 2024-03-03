import React from "react";
import { Link } from "react-router-dom";

// !!!!!!
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Box,
    Button,
  } from '@mui/material'

  
export default function Navbar({navpath:{url1,url2,url3}}){



    let Logout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("fullname")
        localStorage.removeItem("role")
    }

    return (

    <AppBar  position='relative' style={{ background: 'black' }}>
      <Toolbar>
        <IconButton
          size='large'
          color='secondary'
          edge='start'
          aria-label='logo'
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >Web</IconButton>
        <Typography
          component='div'
          variant='h4'
          color='white'
          fontWeight='bold'
          sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
        >Applicaion
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Link to={url1} ><Button>Home</Button></Link>
            {localStorage.getItem("token")  && <Link to={url3} ><Button>Employeelist</Button></Link>}
            {localStorage.getItem("token") ? <h4 style={{margin:"3px 32px 10px 20px"}}>{localStorage.getItem("fullname")}</h4>: <Link to={url2} ><Button>Login</Button></Link>} 
          
            
            <Link to={url2} onClick={Logout}><Button>Logout</Button></Link>
        </Box>
      </Toolbar>
    </AppBar>
            
        
     
    )
}




