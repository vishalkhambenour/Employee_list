import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../subcomponent/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import signupstyle from "./signup.module.css";
import axios from "axios";

let yupSchema = yup.object({
  firstname: yup.string().required("firstname is Mandatory").min(3),
  lastname: yup.string().required("lastname is Mandatory"),
  email: yup
    .string()
    .required("email is Mandatory")
    .email("email is not valid"),
  mobile: yup
    .string()
    .max(10)
    .required("mobile is Mandatory")
    .min(10)
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Must be a number"),
  Password: yup.string().required("Password is Mandatory").min(8),
  password: yup
    .string()
    .required("ConfirmPassword is Mandatory")
    .oneOf([yup.ref("Password")], "Confirm Password must match the Password "),
  gender: yup.string().required("gender is mandatory"),
});

export default function Signup() {
  let [message, setmessage] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  let navigateto = useNavigate();
  const [eye, seteye] = useState(false);

  let submitdta = async ({
    firstname,
    lastname,
    email,
    mobile,
    password,
    gender,
  }) => {
    try {
      let { data } = await axios.post(
        "http://localhost:1100/api/users/register",
        { firstname, lastname, email, mobile, password, gender, role: "admin" }
      );

      setmessage(data.message);
      setTimeout(() => {
        setmessage("");
        navigateto("/login");
      }, 2000);
    } catch (err) {
      console.log("catch");
      console.log(err.response.data);
      setmessage(err.response.data.message);
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };
  return (
    <>
      {" "}
      <div className={signupstyle.main}>
        <h1>Register</h1>

        <form
          action=""
          onSubmit={handleSubmit(submitdta)}
          className={signupstyle.Form}
        >
          <div className={signupstyle.samediv}>
            <Input
              type="text"
              placeholder="FIRST NAME"
              register={{ ...register("firstname") }}
              errorMessage={errors.firstname?.message}
            />
            <Input
              type="text"
              placeholder="LAST NAME"
              register={{ ...register("lastname") }}
              errorMessage={errors.lastname?.message}
            />
          </div>
          <div className={signupstyle.samediv}>
            <Input
              type="email"
              placeholder="email"
              register={{ ...register("email") }}
              errorMessage={errors.email?.message}
            />
            <Input
              type="tel"
              placeholder="PHONE NUMBER"
              register={{ ...register("mobile") }}
              errorMessage={errors.mobile?.message}
            />
          </div>
          <div className={signupstyle.samediv}>
            <Input
              type={eye ? "text" : "password"}
              placeholder="PASSWORD"
              register={{ ...register("Password") }}
              errorMessage={errors.Password?.message}
            />
            <Input
              type={eye ? "text" : "password"}
              placeholder="CONFIRM PASSWORD"
              register={{ ...register("password") }}
              errorMessage={errors.password?.message}
            />
          </div>

          <div className={signupstyle.samediv}>
            <h1>Gender</h1>
            <Input
              type="radio"
              name="gender"
              register={{ ...register("gender") }}
              value="Male"
              id="male"
            />
            <label htmlFor="male">Male</label>
            <Input
              type="radio"
              name="gender"
              register={{ ...register("gender") }}
              value="Female"
              id="female"
            />
            <label htmlFor="female">Female</label>
            <Input
              type="radio"
              name="gender"
              register={{ ...register("gender") }}
              value="Others"
              id="other"
            />
            <label htmlFor="other">Others</label>
          </div>

          <button type="submit">SignUp</button>
        </form>
        <div
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "Green",
          }}
        >
          {!message ? "" : <h1>{message}</h1>}
        </div>
      </div>
    </>
  );
}
