//require garney after install
const express=require('express')//express is a function
const { users } = require('./model/index')//
const cookieParser=require('cookie-parser') //for cookies
//function call and it returns an object in app
const app=express()
require("./model/index")
const jwt =require("jsonwebtoken")

const {promisify}=require("util")

const { renderHomePage, renderAboutPage, renderLoginPage, registersUser, renderRegisterPage, userLogin } = require('./controller/authController')
const {multer,storage}=require('./middleware/multerConfig')
const upload=multer({storage:storage})

const { render } = require('ejs')


//ejs as view engine after installing
app.set("view engine","ejs")  
//nodejs form bata kei data aaudai cha tyo kura bujh natra by default bujhdaina
app.use(express.urlencoded({extended:true}))//ssr 
app.use(express.json())  //backen bahek aru kei form bata audai cha vaney yo hanney eg react
app.use(cookieParser()) //for node js to understand cookies
app.use(async(req,res,next)=>{ // triggers when any link is clicked or any buttons
    const token=req.cookies.jwttoken
    try{
const decryptedResult=await promisify(jwt.verify)(token,"kchahauhency")//promisify is used to convert callback function to promise function 
        if(decryptedResult){
            res.locals.isAuthenticated=true  // type of global variable
        }
    else{
        res.locals.isAuthenticated=false
    }
}
    catch(error){
        res.locals.isAuthenticated=false
    }
    next()  // it is middleware 
})
const authRoute=require('./routes/authRoute')
const questionRoute=require('./routes/questionRoute')
const answerRoute=require('./routes/answerRoute')
app.get('/',renderHomePage)
app.get('/about',renderAboutPage)
app.use("/",authRoute)   //from routes
app.use("/",questionRoute)
app.use("/",answerRoute)

//after this only register ejs can use register css , its done for security reasons
app.use(express.static('public/css/')) //for giving access to css files
app.use(express.static("./storage/"))
app.listen(3000,()=>{
    console.log("project has started at port 3000")
})