// import { useNavigate, useRoutes } from "react-router-dom";

import Login from "./login/login.jsx"
import Home from "./home/Home.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Employeelist from "./employeelist/Employeelist.jsx";
import Createemployeelist from "./createemployee/Createemployee.jsx";
import Signup from "./signup/signup.jsx";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function App() {

let token= localStorage.getItem("token")
let navigateto=useNavigate()
useEffect(()=>{
  if(!token){
    navigateto("/login")
  }
},[])

  return (
    <div>
    <Navbar navpath={{url1:"/",url2:"/login",url3:"/employeelist"}}/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/createemployee" element={<Createemployeelist/>}/>
      <Route path="/employeelist" element= {<Employeelist/>}/>
      <Route path="/login" element= {<Login/>}/> 
      <Route path="/signup" element= {<Signup/>}/> 
    
    </Routes>
    </div>
  );
}

export default App;
