//require garney after install
const express=require('express')
//function call and it returns an object in app
const app=express()


//ejs as view engine after installing
app.set("view engine","ejs")  


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
//after this only register ejs can use register css , its done for security reasons
app.use(express.static('public/css/')) //for giving access to css files
app.listen(3000,()=>{
    console.log("project has started at port 3000")
})