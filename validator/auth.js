const { check } = require("express-validator");

const signupValidator = [check("name").notEmpty()
    .withMessage("Name is Required"),
    check("email")
    .isEmail()
    .notEmpty(),


    check("password")
    .isLength({min: 6})
    .withMessage("Password Should be Atleast 6 Character"),
];


const emailValidator = [
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is REquired")
]


const verifyUserValidator = [
    check("email")
    .isEmail()
    .withMessage("Invalid Message")
    .notEmpty()
    .withMessage("Email is Required"),

    check("code").notEmpty().withMessage("Code is Required")
]


module.exports = {signupValidator, emailValidator, verifyUserValidator};
