const jwt =require("jsonwebtoken")
const {promisify}=require("util")
const { users } = require("../model")
exports.isAuthenticated=async(req,res,next)=>{
const token= req.cookies.jwttoken
if(!token|| token===undefined || token===null){
    return res.redirect("/login")
}

const decryptedResult=await promisify(jwt.verify)(token,"kchahauhency")//promisify is used to convert callback function to promise function 
console.log(decryptedResult)
const data=await users.findByPk(decryptedResult.id) //findbyPk is used to find by primary key 
if(!data){ //if data is not found then it will return invalid token
    return res.send("Invalid token")
}
req.userId=decryptedResult.id // adding key value pair of id in req object 
next() // next is imp 
}