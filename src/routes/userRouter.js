const router = require("express").Router()

const userCtrl = require("../controller/userCtrl")
const auth = require("../middleware/authMiddleware")

router.post("/register", userCtrl.registerUser)
router.get("/users", userCtrl.getAllUsers)
router.delete("/:id", auth, userCtrl.deleteUser)





module.exports = router