const express= require('express');
const fetchuser=require('../middleware/fetchuser')
const router=express.Router();
const Jobprovider=require('../models/Jobprovider');
const sendMail=require('../sendMail');



//Route 1 : Create User request : http://localhost:5000/api/jobprovider/createprofile

router.post('/createprofile',fetchuser,async (req,res)=>{
    
    let obj=req.body;
     
    try{
        //if exists then error
        let data=await Jobprovider.findOne({email:obj.email});
        if(data){
            return res.status(400).json({success:false,error:"Sorry a user with this email exist"})
        }

        //promise method-create a new user
        jobproviderdata = await Jobprovider.create(obj);
        
        res.json({success:true,jobproviderdata})
        }catch(error){
            // console.log(error)
            res.status(500).send({success:false,error:"Some error occured"});
    }
})


//check user exist in jobprovider table or not
//Route 2 : Find Jobprovider : http://localhost:5000/api/jobprovider/find/
router.post('/check/',fetchuser,async (req,res)=>{
    
    if(req.user.role!=="provider")
    {
        res.status(403).send({success:false,error:"can't have permission"});
    }

    try{
        let data=await Jobprovider.findOne({email:req.user.email});
        if(data){
            res.json({success:true})
        }
        else{
            res.json({success:false})
        }
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })


//Route 3 : Find Jobprovider : http://localhost:5000/api/jobprovider/getprofile/
router.post('/getprofile/',fetchuser,async (req,res)=>{
    
    if(req.user.role!=="provider")
    {
        //console.log("provider is called")
        res.status(403).send({success:false,error:"can't have permission"});
    }

    try{
        let data=await Jobprovider.findOne({email:req.user.email});
        if(data){
            res.json({success:true,data})
        }
        else{
            res.json({success:false,error:"profile not found"});
        }
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })


//Route 4 : Edit Jobprovider Profile: http://localhost:5000/api/jobprovider/editprofile/
router.post('/editprofile/',fetchuser,async (req,res)=>{
    
    if(req.user.role!=="provider")
    {
        res.status(403).send({success:false,error:"can't have permission"});
    }

    try{
        let editdata=req.body;
        let data=await Jobprovider.findOne({email:req.user.email});
        if(data){
            
            let editeddata=await Jobprovider.findByIdAndUpdate(data.id,{$set: editdata},{new: true});
            res.json({success:true,editeddata})
        }
        else{
            res.json({success:false,error:"profile not found"});
        }
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })

//Route 5 : Get User Email ID : http://localhost:5000/api/jobprovider/getemail
router.post('/getemail',fetchuser,async (req,res)=>{
    const user=await req.user;
    console.log(req)
    try
    {
        res.json({success:true,email:user.email})
    }catch(error){
        res.status(500).send({success:false,error:[],warning:"Some error occured"});
    }
})

module.exports=router