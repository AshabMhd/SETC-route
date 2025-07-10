require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists");
    } else {
      // Create new admin user
      const adminUser = new User({
        username: "admin",
        password: "admin123", // Will be hashed by the User model's pre-save middleware
        role: "admin",
      });

      await adminUser.save();
      console.log("Admin user created successfully");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

createAdminUser();
