const express= require('express');
const router=express.Router();
const Jobseeker=require('../models/Jobseeker');
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//route for creating profile
router.post('/', fetchuser,
    async(req,res)=>{
        let obj=req.body;
        try{
        //if exists then error
        let data=await Jobseeker.findOne({email:obj.email});
        if(data){
            return res.status(400).json({success:false,error:"Sorry a user with this email exist"})
        }

        //promise method-create a new user
        jobseekerdata = await Jobseeker.create(obj);
        res.json({success:true,jobseekerdata})

        }catch(error){
            // console.log(error)
            res.status(500).send({success:false,error:"Some error occured"});
    }
        // try{
        //     let user = await Jobseeker.findOne({email:obj.email});
        //     const authdetails = await User.findById(req.user.id)
        //     //console.log(req.user.id);
        //     if(user){
        //         return res.status(400).json({success:false,error:["Sorry a user with this email exist"]})
        //     }
        //     const {firstName,lastName,bio,contact,collage,degree,skills,experience,language,englishlevel,city,state,profileimage,resume} = req.body;
        //     const jobseeker = new Jobseeker({
        //         firstName, lastName, bio, contact, collage, degree, skills, experience, language, englishlevel, city, state, profileimage, resume,user : req.user.id, email : authdetails.email
        //     })

        //     const saveJobseeker = await jobseeker.save();
        //     res.json({success:true, saveJobseeker})
        // }
        // catch (error) {
        //     console.error(error.message);
        //     res.status(500).json("Internal Server Error!")
        // }
    }
)

//route for fetching profile details
router.get('/fetchdetails',fetchuser, async (req, res)=>{
    try{
        const details = await Jobseeker.find({email:req.user.email})
        res.json(details)
    }
    catch(error){
        console.error(error.message);
        res.status(500).json("Internal Server Error!")
    }
})

//route for updating profile
router.put('/updatedetails/:id',fetchuser,async (req, res) => {
    const {firstName,lastName,bio,contact,collage,degree,skills,resume,experience,language,englishlevel,city,state,profileimage} = req.body;
    
    //creating a updatedDetails object 
    const updatedDetails = {};
    if(firstName){updatedDetails.firstName = firstName};
    if(lastName){updatedDetails.lastName = lastName};
    if(bio){updatedDetails.bio = bio};
    if(contact){updatedDetails.contact = contact};
    if(collage){updatedDetails.collage = collage};
    if(degree){updatedDetails.degree = degree};
    if(skills){updatedDetails.skills = skills};
    if(resume){updatedDetails.resume = resume};
    if(experience){updatedDetails.experience = experience};
    if(language){updatedDetails.language = language};
    if(englishlevel){updatedDetails.englishlevel = englishlevel};
    if(city){updatedDetails.city = city};
    if(state){updatedDetails.state = state};
    if(profileimage){updatedDetails.profileimage = profileimage};

    //finding the details to be updated and update it.
    let jobseeker = await Jobseeker.findById(req.params.id);
    if(!jobseeker){return res.status(404).send("Not Found")}

    jobseeker = await Jobseeker.findByIdAndUpdate(req.params.id,{$set: updatedDetails},{new: true})
    res.json({success:true, jobseeker:jobseeker})
})

//Route 5 : Get User Email ID : http://localhost:5000/api/jobprovider/getemail
router.post('/getemail',fetchuser,async (req,res)=>{
    const user=await req.user;
    //console.log(req)
    try{
        res.json({success:true,email:user.email})
    }catch(error){
        res.status(500).send({success:false,error:[],warning:"Some error occured"});
    }
})
module.exports=router 
        

    