const express= require('express');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');
// const fetchUser=require('../middleware/fetchUser')
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const sendMail=require('../sendMail');



//Route 1 : Create User request : http://localhost:5000/api/auth/

router.post('/',
    [
        body('name',"Name must be altleast 3 character").isLength({ min: 3 }),
        body('email',"Email is not valid").isEmail(),
        body('password',"Password length must be atleast 5").isLength({ min: 5 }),
    ]
    ,async (req,res)=>{
    
    res.set('Access-Control-Allow-Origin', '*');
    //if not validate then show error's
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false,error: errors.array()});
    }

    //just 3 line for password hashing. Thank You bcrypt
    const salt=await bcrypt.genSalt(10);
    const securePass=await bcrypt.hash(req.body.password,salt);

    //check same email id person exist or not    
    try{
        let user=await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success:false,error:["Sorry a user with this email exist"]})
        }
        //promise method-create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
            role:req.body.role
        })
        
        // sendMail("bhavinbabariya03@gmail.com");
        //generate jwt token
        const JWT_SECRET="bhavinauth";
        const data={user:{id:user.id}};
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({success:true,user : user,jwt:authtoken})
        }catch(error){
            res.status(500).send({success:false,error:["Some error occured"]});
    }
    })


//Route 2 : Login User request : http://localhost:5000/api/auth/login
router.post('/login',
    [
        body('email',"Email is not valid").isEmail(),
        body('password',"Password length must be atleast 5").exists(),
    ]
    ,async (req,res)=>{
    
    //if not validate then show error's
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({suceess:false,error: errors.array()});
    }

    const {email,password}=req.body;
    //check same email id person exist or not    
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,error:[],warning:"Sorry Invalid credentials"})
        }
        
        //match password
        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword)
        {
            return res.status(400).json({success:false,error:[],warning:"Sorry Invalid credentials"})
        }

        //generate jwt token
        const JWT_SECRET="bhavinauth";
        //const data={user:{id:user.id}};
        const data={user};
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({success:true,authtoken:authtoken,role:user.role})
        }catch(error){
            res.status(500).send({success:false,error:[],warning:"Some error occured"});
        }
    })

//Route 3 : get User  request : http://localhost:5000/api/auth/getuser
//     router.post('/getuser',fetchUser,async (req,res)=>{
//     try {
//         const userId=req.user.id;
//         const user=await User.findById(userId).select("-password");
//         res.json(user);

//     } catch (error) {
//         res.status(500).send("Internal Server Error");
//     }
// })

module.exports=router 

//  const user=User(req.body);
//  user.save();