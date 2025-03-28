const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "luna";


const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);

   
    const user = await User.findById(decoded._id);
    
   
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

   
    req.user = user;

  
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
