// routes/userRoutes.js
const express=require("express")
const{ getAllUsers } =require("../Controllers/userController") ;

const router = express.Router();
router.get("/getuser", getAllUsers);       

module.exports = router;
