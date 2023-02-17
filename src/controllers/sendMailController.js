const nodemailer = require("nodemailer");
exports.sendmail  = async(req,res)=> {
  try {
    const { title, content, email } = req.body;
    const userMail = email.includes('@gmail.com') ? email : email + '@gmail.com'
    var transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user:'minhcutebn01@gmail.com',
        pass:'jygsyylxsjgvuefc'
      }
    })
    const mail_options = {
      from:'Xin chào <minhcutebn01@gmail.com>',
      to: userMail,
      subject:title,
      text:content
    }
   await transporter.sendMail(mail_options,function(error,info){
      if (error) {
        res.status(500).send({ message: "Error sending email" });
       } else{
          console.log("Email sent: " + info.response);
          res.send({ message: "Email sent successfully" });
        }
      
    })

  } catch (error) {
    res.send(error)
  }
}
