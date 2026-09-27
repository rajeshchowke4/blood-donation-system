const express = require("express");

const {
    register,
    login,
    createUserByAdmin,
    getAllUsers,
    updateUserRole,
    deleteUser
} = require("../controllers/authContoller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/users", protect, adminOnly, createUserByAdmin);
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/role", protect, adminOnly, updateUserRole);
router.delete("/users/:id", protect, adminOnly, deleteUser);
router.get("/me", protect, (req, res) => res.json(req.user));

module.exports = router;