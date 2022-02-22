const mongoose = require('mongoose');
const {Schema} = mongoose;

const ApplicationSchema=new Schema({
    jobseekerId:{
        type : String,
    },
    jobId:{
        type : String,
    },
})
const Application=mongoose.model('application',ApplicationSchema);
module.exports=Application;
