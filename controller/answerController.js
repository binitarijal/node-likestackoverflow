const { answers } = require("../model")

exports.handleAnswer=async(req,res)=>{
    const {answer}=req.body
    const{id:questionId}=req.params
    const userId=req.userId
    console.log(answer,questionId,userId)
   await answers.create({
        answertext:answer,
        userId,
        questionId,
    })
    res.redirect(`/question/${questionId}`)
}