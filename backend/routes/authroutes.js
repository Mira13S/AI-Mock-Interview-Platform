const express=require('express');
const { registerUser, loginUser, getUserProfile}= require("../controllers/authController");
const {protect}=require("../middleware/authMiddleware");
const router=express.Router();
const upload=require("../middleware/uploadmiddleware");



//Auth Routes
router.post("/register",registerUser); //RegisterUser
router.post("/login", loginUser) //LoginUser
router.get("/profile",protect, getUserProfile); //GetuserProfile


router.post("/upload-image",upload.single("image"),(req,res)=>
{
    if(!req.file)
    {
        return res.status(400).json({message:"No file uploaded"});
    }

    const imageUrl=`${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({imageUrl});
})


module.exports = router;