const nodemailer = require("nodemailer")

const sendMail = async (req,res) => {
    res.send("i AM SEND EMAIL");
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = await nodemailer.createTransport({ 
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: 'haylie.langworth@ethereal.email',
        pass: 'BxJDadPCD4PymtwXj4'
      }
    });

    let info = await transporter.sendMail({
      from: '"Sufyan Malik 👻" <sufi@gmail.com>', // sender address
      to: "sufyanbinimran@gmail.com", // list of receivers
      subject: "Hello Sufi", // Subject line
      text: "Hello Bhai", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Message sent:%s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
