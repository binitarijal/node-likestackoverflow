//require garney after install
const express=require('express')//express is a function
const { users } = require('./model/index')//
//function call and it returns an object in app
const app=express()
require("./model/index")

const { renderHomePage, renderAboutPage, renderLoginPage, registersUser, renderRegisterPage, userLogin } = require('./controller/authController')
const { render } = require('ejs')

//ejs as view engine after installing
app.set("view engine","ejs")  
//nodejs form bata kei data aaudai cha tyo kura bujh natra by default bujhdaina
app.use(express.urlencoded({extended:true}))//ssr 
app.use(express.json())  //backen bahek aru kei form bata audai cha vaney yo hanney eg react
const authRoute=require('./routes/authRoute')

app.get('/',renderHomePage)
app.get('/about',renderAboutPage)
app.use("/",authRoute)   //from routes




//after this only register ejs can use register css , its done for security reasons
app.use(express.static('public/css/')) //for giving access to css files
app.listen(3000,()=>{
    console.log("project has started at port 3000")
})