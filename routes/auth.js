const express = require("express");
const router = express.Router();
const { authController } = require("../controllers");
const {signupValidator, emailValidator, verifyUserValidator} = require("../validator/auth");
const validate = require("../validator/validate");


router.post("/signup", signupValidator, validate, authController.signup);



router.post("/send-verification-email", emailValidator, validate, authController.verifyCode);


router.post("/verify-user", verifyUserValidator, validate, authController.verifyUser);



module.exports = router;