const { questions, users, answers } = require("../model")
exports.renderAskQuestionPage=(req,res)=>{
    res.render("questions/askQuestions")
}
exports.askQuestion=async(req,res)=>{
    const {title,description}=req.body
    console.log(req.body)
   
    const {filename}=req.file// for image
    console.log(req.file)
    const userId=req.userId
    if(!title || !description){
        return res.send("please fill all details")
    }
    await questions.create({
        title,
        description,
        image:filename,
        userId
    })
    res.redirect("/")
}
exports.getAllQuestions=async(req,res)=>{
    const data= await questions.findAll({
        include:[
            {
                model:users
            }
        ]
    })
}

exports.renderSingleQuestionPage=async(req,res)=>{
    const {id}=req.params
     const data= await questions.findAll({
        where:{
            id:id
        },
           include:[{
                   model:users , // joining two tables 
                   attributes:["username"] // to get only username
               }
           ]
       }) // returns array of all questions 
    
    const questionanswers= await answers.findAll({
        where:{
            questionId:id
        },
        include:[{
            model:users,
            attributes:['username']
        }]
    })
   // console.log(data,questionanswers)
       res.render("./questions/singleQuestion",{data,answers:questionanswers})
}