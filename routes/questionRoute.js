const { renderAskQuestionPage, askQuestion } = require("../controller/questionController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router = require("express").Router()
const {multer,storage}=require('../middleware/multerConfig')
const upload=multer({storage:storage})
router.route("/askQuestions").get(renderAskQuestionPage).post( isAuthenticated ,upload.single('image'),askQuestion)
module.exports=router