const User = require('../models/user');
const {errorFunction} = require('../utils/errorFunction');

const expoPushToken = async(res,req)=>{

    const user = User.findOne(req.user._id);
    if(!user){
        return res.json(errorFunction(true, "User Not Found, please register yourself"));
    }
    user.expoPushToken = req.body.token;
    console.log("User registered for notifications: ", user);
    res.status(201).send();
}

module.exports  = expoPushToken;