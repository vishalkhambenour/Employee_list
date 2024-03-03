import React, { useState } from "react";
import Input from "../subcomponent/Input.jsx";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import stylelogin from "./login.module.css"

const yupSchema = yup.object({
  filedinput: yup.string().required("Email or Mobile is Required"),
  password: yup.string().required("Passwoord is Mandatory")
});

export default function Login() {
  let navigateto = useNavigate();
  let [message,setmessage]=useState("")
  const [eye,seteye]=useState(false)
  let {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  let Loginsubmit = async ({filedinput,password}) => {
    try {
      let {data,status} = await axios.post(
        "http://localhost:1100/api/users/login",
        {filedinput,password}
      );
          if (status===200){
            localStorage.setItem("token","Bearer"+" "+data.token)
            localStorage.setItem("fullname",data.fullname)
            localStorage.setItem("role",data.role)
            setmessage(data.message)
            setTimeout(()=>{
              setmessage("")
              navigateto("/");
            },2000)
          }
    } catch (err) {
      console.log("catch");
      console.log(err.response.data);
      setmessage(err.response.data.message)
            setTimeout(()=>{
              setmessage("")
            },2000)
    }}
    let view =()=>{
      seteye(!eye)
    }
  return (
    <>  
    <div className={stylelogin.main}>
      <h1>Login</h1>
      <form action="" className={stylelogin.Form} onSubmit={handleSubmit(Loginsubmit)}>
        <p>User Name</p>
        <Input 
          type={"text"}
          placeholder={"Enter Email or Mobile"}
          register={{ ...register("filedinput") }} 
          errorMessage={errors.filedinput?.message}
        />
        <p>Password</p>
        <Input
          type={(eye === false)?"password":"text"}
          placeholder={"Enter your password"}
          register={{ ...register("password") }}
          errorMessage={errors.password?.message}
        />
        <div className={stylelogin.myeye}>
           {
             eye ? <i onClick={view} className="fa fa-eye" aria-hidden="true" ></i>:<i onClick={view}  className="fa fa-eye-slash" aria-hidden="true" ></i>
           }
        </div>
       

        <button type="submit">Login</button>
      </form>

      <div style={{height:"50px",display:"flex",justifyContent:"center",alignItems:"center",color:"Green"}}>{!message?"":message}
            </div> 
     
    </div>
    </>
  );
}


