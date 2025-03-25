const { renderAskQuestionPage, askQuestion, renderSingleQuestionPage } = require("../controller/questionController")
const { isAuthenticated } = require("../middleware/isAuthenticated")

const router = require("express").Router()
const {multer,storage}=require('../middleware/multerConfig')
const upload=multer({storage:storage})
router.route("/askQuestions").get(renderAskQuestionPage).post( isAuthenticated ,upload.single('image'),askQuestion)

router.route("/question/:id").get(renderSingleQuestionPage)
module.exports=router