import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../subcomponent/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import createemp from "./createemployee.module.css";
import axios from "axios";

let yupSchema = yup.object({
  fullname: yup.string().required("fullname is Mandatory").min(3),
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
  gender: yup.string().required("gender is mandatory"),
});

export default function Createemployeelist() {
  let [message, setmessage] = useState("");
  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(yupSchema) });

  let navigateto = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (location.state) {
      const fetchemployeedetails = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:1100/api/users/viewemployee/${location.state}`
          );
          Object.keys(data.data).forEach((key) => {
            setValue(key, data.data[key], { shouldValidate: true });
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchemployeedetails();
    }
  }, [location.state, setValue]);

  let submitdta = async (e) => {
    let data;
    try {
      if (!location.state) {
        let { image, ...y } = e;
        let imgurl = URL.createObjectURL(image[0]);
        let response = await axios.post(
          "http://localhost:1100/api/users/createemployee",
          { ...y, image: imgurl }
        );
        data = response.data;
      } else {
        let { image, _id, createdAt, updatedAt, ...y } = e;

        let imgurl = URL.createObjectURL(image[0]);

        let response = await axios.put(
          `http://localhost:1100/api/users/update/${location.state}`,
          { ...y, image: imgurl }
        );
        data = response.data;
      }
 
      setmessage(data.message);

      setTimeout(() => {
        setmessage("");
        location.state && navigateto("/employeelist");
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
      <div className={createemp.mainnew}>
        {!location.state ? (
          <h1>Create Employee List</h1>
        ) : (
          <h1>Update Employee List</h1>
        )}
        <form
          action=""
          onSubmit={handleSubmit(submitdta)}
          className={createemp.Formnew}
        >
          <div className={createemp.samedivnew}>
            <Input
              type="text"
              placeholder="FullName"
              register={{ ...register("fullname") }}
              errorMessage={errors.fullname?.message}
            />
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
          <div className={createemp.samedivnew}>
            <p>Gender</p>
            <Input
              type="radio"
              register={{ ...register("gender") }}
              value="Male"
              id="male"
            />
            <label htmlFor="male">Male</label>
            <Input
              type="radio"
              register={{ ...register("gender") }}
              value="Female"
              id="female"
            />
            <label htmlFor="female">Female</label>
            <Input
              type="radio"
              register={{ ...register("gender") }}
              value="Others"
              id="other"
            />
            <label htmlFor="other">Others</label>
          </div>
          <div className={createemp.samedivnew}>
            <p>Designation</p>
            <select {...register("designation")}>
              <option>Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div className={createemp.samedivnew}>
            <p>course</p>
            <Input
              type="checkbox"
              value="MCA"
              id="MCA"
              register={{ ...register("course") }}
            />{" "}
            <label htmlFor="MCA">MCA</label>
            <Input
              type="checkbox"
              value="BCA"
              id="BCA"
              register={{ ...register("course") }}
            />{" "}
            <label htmlFor="BCA">BCA</label>
            <Input
              type="checkbox"
              value="BSC"
              id="BSC"
              register={{ ...register("course") }}
            />{" "}
            <label htmlFor="BSC">BSC</label>
          </div>

          <div className={createemp.samedivnew}>
            <label>Img upload</label>
            <Input
              type="file"
              accept=".jpeg, .jpg, .png"
              register={{ ...register("image") }}
            />
            {location.state && <h6 style={{color:"red"}}>Please upload image </h6> }
          </div>

          {!location.state ? (
            <button type="submit">Create</button>
          ) : (
            <button type="submit">Update</button>
          )}
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
          {!message ? "" : <p>{message}</p>}
        </div>
      </div>
    </>
  );
}
