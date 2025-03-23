const bcrypt= require("bcrypt") // for password hashing
const jwt=require("jsonwebtoken") //for token generation

exports.renderHomePage=(req,res)=>{
    res.render('home')
}
exports.renderAboutPage=(req,res)=>{
    const name="Binita"
    res.render("about",{name})  
}
exports.renderLoginPage=(req,res)=>{
    const name="Binita"
    res.render("auth/login",{name})
}
exports.renderRegisterPage=(req,res)=>{
    const name="Binita"
    res.render("auth/register",{name})
}
exports.registersUser=async(req,res)=>{
   const {username,email,password}=req.body;
   if(!username || !email || !password){
       return res.send("Please fill all the fields")
   }
   const data= await users.findAll({ //findall returns array of all same email
    where:{
        email:email
    }})
   if(data.length>0){
    return res.send("email already exists")
   }
  await users.create({
    email:email,   //if key value same then write only email,  password,
    username:username,
    password: bcrypt.hashSync(password,10) 
   })
   res.send('successful register')
}

exports.userLogin=async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.send("Plz fill all form")
    }
        //checking if email exists in database or not
const [data] = await users.findAll({  // [data] is destructuring holding first element of array
    where:{
        email:email
    }
})
//if data then next password
if(data){
    // checking pw with hashed pw
    isMatched=bcrypt.compareSync(password,data.password)
    if(isMatched){
    const token= jwt.sign({id:data.id},"kchahauhency",{
         expiresIn:'1h'
     })
     console.log(token)
     res.cookie("jwttoken",token)
        return res.send("login success")
    }
    else{
          return res.send("Invalid password")
    }
 }
 else{
     return res.send("Invalid email no user with that email")
 }
}