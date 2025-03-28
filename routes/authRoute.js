const { registersUser, renderRegisterPage, userLogin, renderLoginPage, renderForgotPasswordPage } = require('../controller/authController');

const router= require('express').Router();
router.route("/register").post(registersUser).get(renderRegisterPage)
router.route("/login").post(userLogin).get(renderLoginPage)

router.route("/forgotPassword").get(renderForgotPasswordPage)
module.exports=router; //exporting router