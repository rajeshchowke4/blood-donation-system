const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/user");

dotenv.config();

const email = process.argv[2]?.trim().toLowerCase();

if (!email) {
    console.error("Usage: npm run make-admin -- <user-email>");
    process.exit(1);
}

const promoteUser = async () => {
    await connectDB();

    const user = await User.findOneAndUpdate(
        { email },
        { $set: { role: "admin" } },
        { new: true }
    );

    if (!user) {
        console.error(`No user found with email ${email}`);
        process.exitCode = 1;
    } else {
        console.log(`${user.email} now has admin access`);
    }

    await mongoose.disconnect();
};

promoteUser().catch(async (error) => {
    console.error("Could not promote user:", error.message);
    await mongoose.disconnect();
    process.exitCode = 1;
});