
//const { default: axios } = require('axios');
var nodemailer=require('nodemailer');


//console(userEmail);



function enquiryEmail(){
    let userEmail=localStorage.getItem("email");
    let username=localStorage.getItem("user");
    var outcome='Dear'+ username+', Your transaction is successful';
    console.log(userEmail);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'wyhhhpq@gmail.com',
          pass: '1445yhhw'
        }
      });
    
      var mailOptions = {
        from: 'wyhhhpq@gmail.com',
        to: userEmail,
        subject: 'Transaction Outcome',
        text: outcome
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    

}


export default enquiryEmail;