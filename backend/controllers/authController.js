const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");

//Gnenerate Token
const generateToken = (userId) =>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{expiresIn:"7d"});
};

//@desc Register a new User
//@route POST/ api/auth/register
//@access Public

const registerUser=async(req,res)=>
{
    try{
        const {name,email,password,profileImageUrl} = req.body;

        const UserExists=await User.findOne({email});
        if(UserExists)
        {
            return res.status(400).json({message:"User alredy exists"});
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        //create new user
        const user=await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email: user.email,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id),
        });
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error", error:error.message});
    }

};


//@desc Login User
//@route POST /api/auth/login
//@access Public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password);
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    console.log(user.email,user.password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Match", isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Return user data with JWT
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



//@desc Get User Profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)

const getUserProfile=async(req,res) =>
{
    try{
        const user=await User.findById(req.user.id).select("-password");
        if(!user)
        {
            return res.status(404).json({message: "User Not Found"});
        }
        res.json(user);
    }
    catch
    {
        res.status(500).json({message: "Server Error", error: error.message});
    }

};

module.exports={registerUser, loginUser, getUserProfile};