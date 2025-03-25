const { answers } = require("../model")

exports.handleAnswer=async(req,res)=>{
    const {answer}=req.body
    const{id:questionId}=req.params
    const userId=req.userId
    answers.create({
        answerText:answer,
        userId,
        questionId,
    })
    res.redirect(`/questions/${questionId}`)
}