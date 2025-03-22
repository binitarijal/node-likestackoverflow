//require garney after install
const express=require('express')//express is a function
const { users } = require('./model/index')//
//function call and it returns an object in app
const app=express()
require("./model/index")
const bcrypt= require("bcrypt") // for password hashing
const jwt=require("jsonwebtoken") //for token generation

//ejs as view engine after installing
app.set("view engine","ejs")  
//nodejs form bata kei data aaudai cha tyo kura bujh natra by default bujhdaina
app.use(express.urlencoded({extended:true}))//ssr 
app.use(express.json())  //backen bahek aru kei form bata audai cha vaney yo hanney eg react


app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/about',(req,res)=>{
    const name="Binita"
    res.render("about",{name})  
})


app.get('/login',(req,res)=>{
    const name="Binita"
    res.render("auth/login",{name})
})
app.get('/register',(req,res)=>{
    const name="Binita"
    res.render("auth/register",{name})
})
app.post("/register",async(req,res)=>{
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
})

app.post("/login",async(req,res)=>{
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
})

//after this only register ejs can use register css , its done for security reasons
app.use(express.static('public/css/')) //for giving access to css files
app.listen(3000,()=>{
    console.log("project has started at port 3000")
})