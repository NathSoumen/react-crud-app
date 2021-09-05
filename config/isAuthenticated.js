 
const jwt = require("jsonwebtoken")

module.exports.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) {
        console.log(req.isAuthenticated())
        next()
    } else {
        res.json({message:"User is not authorised"})
    }
}
module.exports.verifyJWT = (req,res,next) => {
    const token = req.headers['x-access-token']
    if(!token) {
        res.json({message:"we need tokens"})
    }else {
        jwt.verify(token,process.env.jwt_secret,(err, decorded) => {
            if(err || !decorded) {
                return   res.json({auth:false ,message:"we need tokens"})

            } else {
                req.userId = decorded.user._id;
                req.userEmail = decorded.user.email;
                req.Username = decorded.user.username;
                next()
            }
        })
    }

}