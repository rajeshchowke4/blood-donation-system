const express = require("express");

const {
    createDonor,
    getMyDonorProfile,
    updateDonor,
    searchDonors,
    getAllDonors,
    deleteDonor
} = require("../controllers/donarController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// Search donors
router.get("/search", searchDonors);

// Logged-in donor
router.post("/", protect, createDonor);

router.get("/me", protect, getMyDonorProfile);

router.put("/me", protect, updateDonor);

// Admin
router.get("/", protect, adminOnly, getAllDonors);

router.delete("/:id", protect, adminOnly, deleteDonor);

module.exports = router;