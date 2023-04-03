const nodemailer = require("nodemailer");
const ORIGINAL_MAIL = 'minhcutebn01@gmail.com';
const ORIGINAL_MAIL_PASS = 'vfbihtfknzfwsdyd'

exports.sendmail = async (req, res) => {
  try {
    const { title, content, email } = req.body;
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ORIGINAL_MAIL,
        pass: ORIGINAL_MAIL_PASS
      }
    })

    const mailOptions = {
      from: 'Đại học Thuỷ Lợi thông báo <minhcutebn01@gmail.com>',
      bcc: email,
      subject: title,
      html: content
    }
    
    transporter.sendMail(mailOptions, (error) => {
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
