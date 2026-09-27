const express = require("express");

const {
    createRequest,
    getMyRequests,
    getAllRequests,
    updateRequestStatus,
    deleteRequest
} = require("../controllers/requestController");

const {
    protect,
    adminOnly,
    staffOrAdmin
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createRequest);

router.get("/my", protect, getMyRequests);

router.get("/", protect, staffOrAdmin, getAllRequests);

router.put(
    "/:id/status",
    protect,
    staffOrAdmin,
    updateRequestStatus
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteRequest
);

module.exports = router;