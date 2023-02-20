const nodemailer = require("nodemailer");
const ORIGINAL_MAIL = 'minhcutebn01@gmail.com';
const ORIGINAL_MAIL_PASS = 'jygsyylxsjgvuefc'

exports.sendmail = async (req, res) => {
  try {
    const { title, content, email } = req.body;
    if(!email || !title || !content) {
      res.status(422).send({ success: false, message: "You must enter all fields" });
      return 
    }
    const userMail = email.includes('@gmail.com') ? email : `${email}@gmail.com`
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ORIGINAL_MAIL,
        pass: ORIGINAL_MAIL_PASS
      }
    })
    const mailOptions = {
      from: 'Xin chào <minhcutebn01@gmail.com>',
      to: userMail,
      subject: title,
      text: content
    }
    await transporter.sendMail(mailOptions, (error) => {
      if (error) {
        res.status(500).send({ success: false, message: "Error sending email", error });
      } else {
        res.send({ success: true, message: "Email sent successfully" });
      }
    })

  } catch (error) {
    res.send(error)
  }
}
