//require garney after install
const express=require('express')
const { users } = require('./model/index')
//function call and it returns an object in app
const app=express()
require("./model/index")

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
  await users.create({
    email:email,   //if key value same then write only email,  password,
    username:username,
    password:password
   })
   res.send('successful register')
})
//after this only register ejs can use register css , its done for security reasons
app.use(express.static('public/css/')) //for giving access to css files
app.listen(3000,()=>{
    console.log("project has started at port 3000")
})