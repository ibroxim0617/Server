const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")

const User = require("../models/userModel")

const userCtrl ={
    // Register new user
    registerUser: async (req, res) =>{
        const {email, password} = req.body
        try {
            const oldUser = await User.findOne({email})
            if(oldUser){
                return res.status(400).json({message: "User already exists"})
            }
            const heshPassword = await bcrypt.hash(password, 10)

            req.body.password = heshPassword

            const newUser = new User(req.body)
            await newUser.save()

            const token = JWT.sign({email, id: newUser._id}, process.env.JWT_SECRET_KEY)

            res.status(201).json({msg: "sign Up succesfully", newUser, token})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },

    getAllUsers: async (req, res) => {
        try {
            let users = await User.find()
            users = users.map((user)=> {
                const {password, ...ushabqol} = user._doc
                return ushabqol
            })

            res.status(200).json(users)
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },

    deleteUser: async (req, res) => {
        const {id} = req.params
        const {userId} = req.body
        if(id === userId){
            try {
                await User.findByIdAndDelete(id)
                res.status(200).json("user delete succssfely")
            } catch (error) {
              res.status(500).json({msg: error.message})
            }
        } else{
            res.status(403).json("siz faqat ozingizni accound ingizni o'chrishingiz mumkin")
        }
    }


}

module.exports = userCtrl