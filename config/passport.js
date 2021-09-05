const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = function(passport){
   

    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password"
    },(usernameField, passwordField, done) =>{
        User.findOne({email:usernameField},((err ,doc) => {
            // console.log(doc)
            if(err ) return done(err)
            else {
                if(!doc) return done(null ,false, {
                    message:"This is not valid registered email"
                })
                let valid = doc.comparePass(passwordField,doc.password)
                if(!valid) {
                    done(null, false, {message:" password/email does not match"})
                } else {
                    done(null, doc)
                }
            }
         

        }))
    }))

    passport.serializeUser( (user,done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id,(err, user) => {
            done(null, user)
        })
    })
}