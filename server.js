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
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
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

app.use("/api/users", userRoutes)
app.use("/api/memo",verifyJWT, memoRoutes)

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