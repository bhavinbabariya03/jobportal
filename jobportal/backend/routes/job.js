const express= require('express');
const fetchuser=require('../middleware/fetchuser')
const router=express.Router();
const Job=require('../models/Job');
const Jobprovider=require('../models/Jobprovider');
const sendMail=require('../sendMail');



//Route 1 : Create Job  : http://localhost:5000/api/job/createjob

router.post('/createjob',fetchuser,async (req,res)=>{
    
    const {title,role,type,hrname,skill,description,expfrom,expto}=req.body;
     
    try{
        // promise method-create a new user
        let jobprovider=await Jobprovider.findOne({email:req.user.email});
        const savedJob = await Job.create({
            title,role,type,hrname,skill,description,expfrom,expto,postedby:jobprovider.id
        });
        
        res.json({success:true,job:savedJob})
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
    }
})


//Route 2 : Edit Job: http://localhost:5000/api/job/editjob/:id
router.put('/editjob/:id',fetchuser,async (req,res)=>{

    const {title,role,type,hrname,skill,description,expfrom,expto}=req.body;
    try {
        
        let newJob={};
        if(title){newJob.title=title;}
        if(role){newJob.role=role;}
        if(type){newJob.type=type;}
        if(hrname){newJob.hrname=hrname;}
        if(skill){newJob.skill=skill;}
        if(description){newJob.description=description;}
        if(expfrom){newJob.expfrom=expfrom;}
        if(expto){newJob.expto=expto;}
        
        // Find the note to be updated and update it
        let job = await Job.findById(req.params.id);
        if (!job) { return res.status(404).send("Not Found") }

        if (job.postedby.toString() !== req.user._id) {
            return res.status(401).send("Not Allowed");
        }
        job = await Job.findByIdAndUpdate(req.params.id, { $set: newJob }, { new: true })
        res.json({success:"true",job});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }      
})


//Route 3 : Find Jobprovider : http://localhost:5000/api/job/deletejob/:id
router.delete('/deletejob/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let job = await Job.findById(req.params.id);
        if (!job) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (job.postedby.toString() !== req.user._id) {
            return res.status(401).send("Not Allowed");
        }

        job = await Job.findByIdAndDelete(req.params.id)
        res.json({success:true,job: job });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({success:false,error:"Internal Server Error"});
    }
})


//Route 4 : Get  job : http://localhost:5000/api/job/getjob/
router.get('/getjob/',fetchuser,async (req,res)=>{
    
    try{
        let jobprovider=await Jobprovider.findOne({email:req.user.email});
        let data=await Job.find({postedby:jobprovider.id});
        res.json({success:true,data});
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })

//Route 5 : Get ALL job : http://localhost:5000/api/job/getalljob/
router.get('/getalljob/',fetchuser,async (req,res)=>{
    
    try{
        let data=await Job.find();
        res.json({success:true,data});
        }catch(error){
            res.status(500).send({success:false,error:"Some error occured"});
        }
    })

//Route 5 : Get User Email ID : http://localhost:5000/api/job/getemail
router.post('/getemail',fetchuser,async (req,res)=>{

    const user=await req.user;
    try
    {
        res.json({success:true,email:user.email})
    }catch(error){
        res.status(500).send({success:false,error:[],warning:"Some error occured"});
    }
})

module.exports=router 

