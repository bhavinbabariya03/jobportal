const express= require('express');
const router=express.Router();
const Jobseeker=require('../models/Jobseeker');
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

//route for creating profile
router.post('/', fetchuser,
    async(req,res)=>{
        try{
            let user = await Jobseeker.findOne({user: req.user.id});
            const authdetails = await User.findById(req.user.id)
            //console.log(req.user.id);
            if(user){
                return res.status(400).json({success:false,error:["Sorry a user with this email exist"]})
            }
            const {firstName,lastName,bio,contact,collage,degree,skills,experience,language,englishlevel,city,state,profileimage} = req.body;
            const jobseeker = new Jobseeker({
                firstName, lastName, bio, contact, collage, degree, skills, experience, language, englishlevel, city, state, profileimage, user : req.user.id, email : authdetails.email
            })

            const saveJobseeker = await jobseeker.save();
            res.json({success:true, saveJobseeker})
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json("Internal Server Error!")
        }
    }
)

//route for fetching profile details
router.get('/fetchdetails',fetchuser, async (req, res)=>{
    try{
        const details = await Jobseeker.find({user: req.user.id})
        res.json(details)
    }
    catch(error){
        console.error(error.message);
        res.status(500).json("Internal Server Error!")
    }
})

//route for updating profiler
router.put('/updatedetails/:id',fetchuser,async (req, res) => {
    const {firstName,lastName,bio,contact,collage,degree,skills,experience,language,englishlevel,city,state,profileimage} = req.body;
    //creating a updatedDetails object 
    const updatedDetails = {};
    if(firstName){updatedDetails.firstName = firstName};
    if(lastName){updatedDetails.lastName = lastName};
    if(bio){updatedDetails.bio = bio};
    if(contact){updatedDetails.contact = contact};
    if(collage){updatedDetails.collage = collage};
    if(degree){updatedDetails.degree = degree};
    if(skills){updatedDetails.skills = skills};
    if(experience){updatedDetails.experience = experience};
    if(language){updatedDetails.language = language};
    if(englishlevel){updatedDetails.englishlevel = englishlevel};
    if(city){updatedDetails.city = city};
    if(state){updatedDetails.state = state};
    if(profileimage){updatedDetails.profileimage = profileimage};

    //finding the details to be updated and update it.
    let jobseeker = await Jobseeker.findById(req.params.id);
    if(!jobseeker){return res.status(404).send("Not Found")}

    if(jobseeker.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    jobseeker = await Jobseeker.findByIdAndUpdate(req.params.id,{$set: updatedDetails},{new: true})
    res.json({success:true, jobseeker:jobseeker})
})
module.exports=router 
        

    