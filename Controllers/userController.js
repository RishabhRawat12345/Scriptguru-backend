// controllers/userController.js
const User = require("../Models/User");

const getAllUsers = async (req, res) => {
  try {
    // fetch raw docs with only email+password
    const users = await User.find().select("email password").lean();

    // map _id → id, include email & password
    const data = users.map(u => ({
      id:       u._id.toString(),
      email:    u.email,
      password: u.password
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllUsers };
