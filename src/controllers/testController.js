const nodemailer = require("nodemailer");
exports.sendmail  = async(req,res)=> {
  try {
    console.log('đã chạy vào try')
    let mail = req.body.mail
    console.log(req.body.mail,"maillllll");
    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user:'minhcutebn01@gmail.com',
        pass:'jygsyylxsjgvuefc'
      }
    })
    const mail_options = {
      from:'minhcutebn01@gmail.com',
      to: mail+"@gmail.com",
      subject:'tiêu đề',
      text:'djt me may đi chùa Hà không'
    }
   await transporter.sendMail(mail_options,function(error,info){
    console.log("mail options");
      if (error) {
        console.log("chạy vào await if");
        res.status(500).send({ message: "Error sending email" });
       } else{
        console.log("chạy vào await else");
          console.log("Email sent: " + info.response);
          res.send({ message: "Email sent successfully" });
        }
      
    })

  } catch (error) {
    console.log(error,"đã chạy vào catch");
    res.send(error)
  }
}
