const BloodRequest = require("../models/bloodrequest");

// Create request
const createRequest = async (req, res) => {
    try {
        const {
            patientName,
            bloodGroup,
            unitsRequired,
            hospital,
            city,
            contactNumber,
            urgency
        } = req.body;

        const request = await BloodRequest.create({
            requester: req.user._id,
            patientName,
            bloodGroup,
            unitsRequired,
            hospital,
            city,
            contactNumber,
            urgency
        });

        res.status(201).json(request);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get my requests
const getMyRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find({
            requester: req.user._id
        })
            .populate("requester", "name email")
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all requests
const getAllRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find()
            .populate("requester", "name email")
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update request status
const updateRequestStatus = async (req, res) => {
    try {
        const { status } = req.body || {};
        const allowedStatuses = ["Pending", "Fulfilled", "Cancelled"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid request status"
            });
        }

        const request = await BloodRequest.findById(
            req.params.id
        );

        if (!request) {
            return res.status(404).json({
                message: "Blood request not found"
            });
        }

        request.status = status;

        await request.save();

        res.json(request);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete request
const deleteRequest = async (req, res) => {
    try {
        const request = await BloodRequest.findById(
            req.params.id
        );

        if (!request) {
            return res.status(404).json({
                message: "Blood request not found"
            });
        }

        await request.deleteOne();

        res.json({
            message: "Request deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createRequest,
    getMyRequests,
    getAllRequests,
    updateRequestStatus,
    deleteRequest
};