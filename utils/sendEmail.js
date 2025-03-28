const nodemailer=require('nodemailer')

const sendEmail=async(data)=>{
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: "rijalbinita01@gmail.com",
        pass:"hxunhsglvqgzecew"
    }
})
const mailOption={
    from: "nodejslms.com",
    to: data.email,
    subject: data.subject,
    text:data.text
}
 await transporter.sendMail(mailOption)
}

module.exports=sendEmail