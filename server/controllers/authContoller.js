const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Donor = require("../models/donar");
const BloodRequest = require("../models/bloodrequest");

const createToken = (userId) => jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
);

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body || {};
        const normalizedEmail = typeof email === "string"
            ? email.trim().toLowerCase()
            : "";

        if (
            typeof name !== "string" || !name.trim() ||
            !normalizedEmail ||
            typeof password !== "string" || password.length < 6
        ) {
            return res.status(400).json({
                message: "Name and email are required; password must be at least 6 characters"
            });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });

        res.status(201).json({
            token: createToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        res.status(500).json({
            message: "Registration failed"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        const normalizedEmail = typeof email === "string"
            ? email.trim().toLowerCase()
            : "";

        if (!normalizedEmail || typeof password !== "string") {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email: normalizedEmail });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            token: createToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};

const createUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, role = "user" } = req.body || {};
        const normalizedEmail = typeof email === "string"
            ? email.trim().toLowerCase()
            : "";

        if (
            typeof name !== "string" || !name.trim() ||
            !normalizedEmail ||
            typeof password !== "string" || password.length < 6
        ) {
            return res.status(400).json({
                message: "Name and email are required; password must be at least 6 characters"
            });
        }

        if (!["user", "staff", "admin"].includes(role)) {
            return res.status(400).json({
                message: "Role must be user, staff, or admin"
            });
        }

        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists"
            });
        }

        return res.status(500).json({
            message: "User creation failed"
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: "Could not load users"
        });
    }
};

const updateUserRole = async (req, res) => {
    const { role } = req.body || {};
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    if (!["user", "staff", "admin"].includes(role)) {
        return res.status(400).json({ message: "Role must be user, staff, or admin" });
    }

    if (userId === req.user._id.toString() && role !== "admin") {
        return res.status(400).json({ message: "You cannot remove your own admin access" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Could not update user role" });
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    if (userId === req.user._id.toString()) {
        return res.status(400).json({ message: "You cannot delete your own account" });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await Promise.all([
            Donor.deleteMany({ user: userId }),
            BloodRequest.deleteMany({ requester: userId })
        ]);
        await user.deleteOne();

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Could not delete user" });
    }
};

module.exports = {
    register,
    login,
    createUserByAdmin,
    getAllUsers,
    updateUserRole,
    deleteUser
};