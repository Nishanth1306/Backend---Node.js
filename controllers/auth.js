const {User} = require("../models");
const hashPassword = require("../utils/hashpassword");
const  generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail =  require("../utils/sendEmail");



const signup = async (req, res, next) => {
    try{
        const { name, email, password, role} = req.body;


        const hashedPassword =  await hashPassword(password);
        
        const newUser = new User({name, email, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({code: 201, status: true,message: "User registered successfully"});
    }
    catch(error){
        next(error);
    }
};


const verifyCode = async(req, res, next) =>{
    try{
        const {email} = req.body;

        const user = await User.findOne({email});
        if(!user){
            res.code = 404;
            throw new Error("User Not Found");
        }
        if(user.isVerified){
            res.code = 400;
            throw new Error("User Already Verified")
        }

        const code = generateCode(6);

        user.verificationCode  = code;
        await user.save();
        //send email

        await sendEmail({
            emailTo: user.email,
            Subject:"Email verification code",
            code,
            content:"verify your account",
        })



        res.status(200).json({code: 200, status: true, message:"User verfication code sent Successfuly"})

    }catch(error){
        next(error)
    }

};

const verifyUser = async(req, res, next) => {
    try{
        const {email, code} = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.code = 404;
            throw new Error("User not found");
        }




        user.isVerified = true;
        user.verificationCode = null;
        await user.save();
        res.status(200).json({code: 200, status: true, message:"User verfied successfully"});


    }
    catch(error){
        next(error)
    }
};

module.exports = { signup , verifyCode, verifyUser};
