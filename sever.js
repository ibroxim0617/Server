const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

// ROUTES
const userRouter = require("./src/routes/userRouter")
const uploadRouter = require("./src/routes/uploadRouter")


const app = express()

dotenv.config()

const PORT = process.env.PORT || 4001

// to save files for public
app.use(express.static('src/public'))

// midleewers
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

// usege of router
app.use("/user", userRouter)
app.use("/upload", uploadRouter)


app.get("/", (req, res) => {
    res.send("ishlavoti")
})


// DATA BAZEE
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    app.listen(PORT, ()=> console.log(`server started on ${PORT}`))
}).catch((error) => console.log(error))