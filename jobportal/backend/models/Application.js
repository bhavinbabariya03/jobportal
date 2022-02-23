const mongoose = require('mongoose');
const {Schema} = mongoose;

const ApplicationSchema=new Schema({
    jobseekerId:{
        type : String,
        required:true
    },
    jobId:{
        type : String,
        required:true
    },
    round:{
        type : Number,
        default:0
    },
    rejected:{
        type : Number,
        default:0
    },
    hired:{
        type : Number,
        default:0
    },
    
})
const Application=mongoose.model('application',ApplicationSchema);
module.exports=Application;
