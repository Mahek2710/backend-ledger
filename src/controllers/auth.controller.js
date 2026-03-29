const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

/*
User Registration Controller
POST /api/auth/register
*/



async function userRegisterController(req,res){
    const {email , password , name} = req.body;

    const isExists = await userModel.findOne({
        email:email
    });

    if(isExists){
        return res.status(422).json({
            message:"User already exists",
            status:"failed"
        });
    }


    const user = await userModel.create({
        email,
        password,
        name
    });

    const token = jwt.sign({
        id:user._id
    }, process.env.jwt_secret, {
        expiresIn:"3d"
    });

    res.cookies("token",token);
    return res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name
        },
        token,
        message:"User registered successfully",
        status:"success",   
    });

}

module.exports = {
    userRegisterController
}