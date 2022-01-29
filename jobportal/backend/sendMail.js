const nodemailer=require('nodemailer')

const sendMail=(to,subject,html)=>{
    //make transporter
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth : {     
            // user:process.env.DEFAUL_EMAIL,
            // pass:process.env.DEFAUL_EMAIL_PASSWORD
            user:'nbjtestproject@gmail.com',
            pass:'nbj@1234'
        },
        secure:true,
        tls: {
            rejectUnauthorized: false
        }
    });
 
    //prepare Mail Option
    var mailOptions = {
        from : 'nbjtestproject@gmail.com',
        to : to ,
        subject : subject ,
       
        // html : "<h5>Your OTP is "+OTP +"</h5>"
        html : html
    }

    //send Mail
    transporter.sendMail(mailOptions,function(err,info){
        if(err){
            console.log(err);
            return false;
        }else{
            console.log("Email sent: " + info.response );
            return true;
        }
    });
}

module.exports=sendMail;
