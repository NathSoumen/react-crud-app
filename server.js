const path = require('path')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const expressSanitizer = require('express-sanitizer');
const cors = require('cors')

const userRoutes = require('./routes/userRoutes')
const memoRoutes = require('./routes/memoRoutes');

const { verifyJWT } = require('./config/isAuthenticated');
const app = express()
try {
    mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
        console.log("Database is connected")
    },(err) => {
        console.lo(err)
    })
} catch (error) {
    console.log(error)
}



require('./config/passport')(passport)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(expressSanitizer());
app.use(passport.initialize())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.use("/api/users", userRoutes)
app.use("/api/memo", memoRoutes)

// for deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get("*" ,(req,res,next) => {
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
} else {
    app.get('/',(req,res) => {
        res.send("API running")
    })
}



const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server is ruuning at http://localhost:${PORT}`);
})