const asyncWrapper = require("../helper/asyncwraper");
const customApiError = require("../helper/customapierror");
const dataCollection = require('../model/user.model')
const Employeelists = require("../model/employeelist.model")

const jwt = require('jsonwebtoken')


let Register=asyncWrapper(async(req,res,next)=>{

    let {firstname,lastname,email,mobile,password,gender,role}=req.body

    let fullname= firstname+" "+lastname
    let isemail=await dataCollection.findOne({email})

    if(!isemail){
        let ismobile= await dataCollection.findOne({mobile})
        if(!ismobile){
            
            let registered=await dataCollection.create({fullname,email,mobile,password,gender,role})
            if(registered){
                console.log("entered");
                return res.status(201).json({error:false,message:"Registered successfully",data:registered})
        }
    }
        else{
            throw customApiError("Mobile already exists",406)
        //    return res.status(406).json({error:true,message:"Mobile already exists"})
        }

    }else{
        throw customApiError("Email already exists",406)
    //    return res.status(406).json({error:true,message:"Email already exists"})
    }

})

let Login=asyncWrapper(async(req,res,next)=>{

    let {filedinput,password}=req.body
    let isinput;

    // console.log(typeof(filedinput));
    
    if(!filedinput.includes('@')){

         isinput=await dataCollection.findOne({
            mobile:filedinput
         })
    }else{
        isinput=await dataCollection.findOne({email:filedinput})
    }

    if(isinput){
        if(isinput.password===password)
        {
                if(isinput.role==="admin")
                {
                    let token= jwt.sign({fullname:isinput.fullname},"vishalsk",{expiresIn:"1d"})
                    return res.status(200).json({error:false,message:"Loged in Successfully",token,fullname:isinput.fullname,role:isinput.role})
                }
                let token= jwt.sign({fullname:isinput.fullname},"vishalsk",{expiresIn:"1d"})
            return res.status(200).json({error:false,message:"Loged in Successfully",token,fullname:isinput.fullname,role:isinput.role})
        }
        else{
            return res.status(406).json({error:true,message:"invalid Password"})
        }
    }else
    {
        return res.status(401).json({error:true,message:"mobile or email not matching"})
    }
})

// ! Employee list

const Employeelist=asyncWrapper(async(req,res,next)=>{

    // let createdby=req.fullname

    let AllTasks= await Employeelists.find()

    if(!AllTasks){
        return res.status(409).json({error:true, message:"no products found"})
    }else{
        return res.status(200).json({error:false, message:"no products found",AllTasks})
    }
})

// !createemploye

const createemploye =asyncWrapper(async(req,res)=>{


        let createproduct=await Employeelists.create(req.body)
        return res.status(200).json({error:false,message:"product added successfully",data:createproduct})
       
})

// !update

let updateemployee=asyncWrapper(async(req,res)=>{

    let {id}=req.params;
    let info=req.body
    let update=await Employeelists.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})

    if(!update){
        return res.status(404).json({error:true,message:"No task found"})
    }
    return res.status(200).json({error:false,message:"Updated sucessfully",data:update})

})

// !! deletee employee

let deleteemployee=asyncWrapper(async(req,res,next)=>{

    let {id}=req.params;
    await Employeelists.findByIdAndDelete(id)
    return res.status(200).json({error:false,message:"Task Deleted"})

})

// !viewemployee

const viewemployee=asyncWrapper(async(req,res,next)=>{

    let {id}=req.params;

    let view= await Employeelists.findById(id)
    // console.log(view)
    if(!view){
       return res.status(201).json({error:true,message:"No Tasks Found"})
    }else{
       return res.status(200).json({error:false,message:"Task found",data:view})
    }
})



module.exports={Register,Login,Employeelist,createemploye,deleteemployee,updateemployee,viewemployee}