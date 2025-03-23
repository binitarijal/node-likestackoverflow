const { registersUser, renderRegisterPage, userLogin, renderLoginPage } = require('../controller/authController');

const router= require('express').Router();
router.route("/register").post(registersUser).get(renderRegisterPage)
router.route("/login").post(userLogin).get(renderLoginPage)
module.exports=router; //exporting router