const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); 

router.post("/cycles", authMiddleware, async (req, res) => {
  try {
    const user = req.user; 

 
    user.cycles += 1;
    await user.save();

    res.status(200).json({ message: "Cycle completed", cycles: user.cycles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save cycle data" });
  }
});


router.get("/cycles", authMiddleware, async (req, res) => {
  try {
    const user = req.user; 
    res.status(200).json({ cycles: user.cycles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cycle data" });
  }
});

module.exports = router;
