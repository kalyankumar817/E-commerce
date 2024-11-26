const User=require('../models/userSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user Registration 
const registerUser=async(req,res)=>{
    try{
        const{username,email,password}=req.body;
         // Check if username, email, or password is missing
         if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        //check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Email Already Exists ,So Use Another One'});
        }
        //hash the password
        const hashedPassword=await bcrypt.hash(password,10)
        //create new user
        const user=await User.create({username,email,password:hashedPassword});
        res.status(200).json({message:'User Registered Successfully',user})
    }catch(err){
        res.status(500).json({message:'Error Registering User',err})
    }
}

//user Login
const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        // Check if email and password are provided for security purposes(hackers)
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' });
        }
        // Find user by email
        const checkingUser = await User.findOne({ email });
        if (!checkingUser) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        // Validate password
        const pwdValid = await bcrypt.compare(password, checkingUser.password);
        if (!pwdValid) {
            return res.status(404).json({ message: 'Invalid Email or Password' });
        }
        //Genegrate Jwt
        const accessToken = jwt.sign({ id: checkingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: checkingUser._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

        // Store the refresh token in the database for this user
        checkingUser.refreshToken = refreshToken; // Save the refresh token in the user's document
        await checkingUser.save();

        res.cookie('accessToken', accessToken, {
            httpOnly: true, // Prevent access from JavaScript
            secure: false, // Ensure it's sent only over HTTPS
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 1 * 60 * 60 * 1000, // 1hr
        });

        // Set the refresh token in an HTTP-only cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, // Prevent access from JavaScript
            secure: false, // Ensure it's sent only over HTTPS
            sameSite: 'Strict', // Prevent CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        //here refresh token save to dataabse give m code 
        res.status(200).json({message:'Login Successful',accessToken,refreshToken})
    }catch(err){
        res.status(500).json({message:'Error Logging in',err})
    }
}

//logout
const logout = async (req, res) => {
    try {
        // Get the refresh token from the cookies
        const refreshToken = req.cookies.refreshToken;

        // If there is no refresh token, respond with an error
        if (!refreshToken) {
            return res.status(400).json({ message: 'No refresh token provided' });
        }

        // Find the user by their refresh token (to ensure the token is valid)
        const checkingUser = await User.findOne({ refreshToken });
        if (!checkingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the refresh token from the user's document in the database
        checkingUser.refreshToken = null;
        await checkingUser.save();

        // Clear cookies
        res.clearCookie('accessToken');  // Clear the access token cookie
        res.clearCookie('refreshToken'); // Clear the refresh token cookie

        // Send a success message
        res.status(200).json({ message: 'Logged out successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error logging out', err });
    }
};

const validateSession = async (req, res) => {
    try {
      const token = req.cookies.accessToken; // Get access token from cookies
  
      if (!token) {
        return res.status(401).json({ message: 'No access token provided' });
      }
  
      // Verify the access token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // If valid, return user data
      res.status(200).json({ user });
    } catch (err) {
      console.error('Session validation failed:', err.message);
      res.status(401).json({ message: 'Invalid session', error: err.message });
    }
};
module.exports={registerUser,loginUser,logout,validateSession}