const express = require('express')
const Passport = require('passport')
const router = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {verifyJWT} = require('../config/isAuthenticated')



router.get('/' ,verifyJWT, async(req,res) => {
    try {
        await User.find({}).then(doc => {
            res.json(doc)
        })
    } catch (error) {
        res.send("Error " + error)
    }
   
})


router.get('/currentUser',verifyJWT,(req,res) => {
    try {
        res.json({userID:req.userId})
    } catch (error) {
        res.send({error: true})
    }
})



router.post('/login',(req,res) => {
    try {
        Passport.authenticate('local',{session:false} ,(err ,user) => {
            if(err) {
                return res.json({message:"Something is not right"})
            }
            req.login(user, {session:false}, (err) => {
                if(err || !user || user == undefined) {
                    res.json(err)
                } else {
                    // generate tokken
                    const token = jwt.sign({user}, process.env.jwt_secret,{expiresIn:"23h"})
                     return res.json({auth:true,user:{name:user.username, email:user.email}, token:token})
                }
                 
            
            })
           
        })(req,res);
    } catch (error) {
        res.json("Error in database")
    }

})


router.post('/signup', async(req,res) => {

    const email = req.body.email ;
    const username = req.body.username;
    const pass = req.body.password;
    

    try {
      await  User.findOne({email :email}).then(doc => {
        try {
            
            if(doc) {
                res.json(`${email} is already exits`)
            }
            const newUser = new User();
            newUser.email = email;
            newUser.username = username;
            let passw = newUser.hashPass(pass)
            newUser.password = passw
            newUser.save().then( () => {
                res.json( "User account is created")
            }).catch((err) => {
                res.json({error:"Error happend"})
            })
          } catch (error) {
              res.json("Error >> " + error)
          }
              
      }).catch(err => {
          res.json("Error happend")
      })


  
    } catch (error) {
        res.json("Error happend")
    }
 
})

module.exports = router