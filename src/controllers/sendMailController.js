const nodemailer = require("nodemailer");
const ORIGINAL_MAIL = 'minhcutebn01@gmail.com';
const ORIGINAL_MAIL_PASS = 'vfbihtfknzfwsdyd'
const employeeController = require("../models/employeeModel");

exports.sendMail = async (req, res) => {
  try {
    if (req.body.type == "other") {
      const { title, content, email } = req.body;
      if (!email || !title || !content) {
        res.status(422).send({ success: false, message: "You must enter all fields" });
        return
      }
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: ORIGINAL_MAIL,
          pass: ORIGINAL_MAIL_PASS
        }
      })
      const mailOptions = {
        from: 'Xin chào <minhcutebn01@gmail.com>',
        to: email,
        subject: title,
        text: content,
        html: '<h1 style="font-family: Times New Roman">Xin chào </h1><p>Bạn có thông báo mới !!!</p>'
      }
      await transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).send({ success: false, message: "Error sending email", error });
        } else {
          res.send({ success: true, message: "Email sent successfully" });
        }
      })
    } if (req.body.type == "all") {
      const { title, content } = req.body;
      if (!title || !content) {
        res.status(422).send({ success: false, message: "You must enter all fields" });
        return
      }
      const emailEmployee = await employeeController.find({}, { email: 1, _id: 0 });
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: ORIGINAL_MAIL,
          pass: ORIGINAL_MAIL_PASS
        }
      })
      const mailOptions = {
        from: 'Xin chào <minhcutebn01@gmail.com>',
        to: emailEmployee,
        subject: title,
        text: content,
        html: '<h1 style="font-family: Times New Roman">Xin chào </h1><p>Thông báo đến toàn bộ nhân sự trong trường !!!</p>'
      }
      await transporter.sendMail(mailOptions, (error) => {
        if (error) {
          res.status(500).send({ success: false, message: "Error sending email", error });
        } else {
          res.send({ success: true, message: "Email sent successfully" });
        }
      })
    }
  } catch (error) {
    res.send(error)
  }
}