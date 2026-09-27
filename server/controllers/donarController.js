const Donor = require("../models/donar");

// Create donor profile
const createDonor = async (req, res) => {
    try {
        const existingDonor = await Donor.findOne({
            user: req.user._id
        });

        if (existingDonor) {
            return res.status(400).json({
                message: "Donor profile already exists"
            });
        }

        const donor = await Donor.create({
            user: req.user._id,
            bloodGroup: req.body.bloodGroup,
            phone: req.body.phone,
            city: req.body.city,
            address: req.body.address,
            age: req.body.age,
            gender: req.body.gender,
            available: req.body.available ?? true,
            lastDonationDate: req.body.lastDonationDate || null
        });

        res.status(201).json(donor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get logged-in donor profile
const getMyDonorProfile = async (req, res) => {
    try {
        const donor = await Donor.findOne({
            user: req.user._id
        }).populate("user", "name email");

        if (!donor) {
            return res.status(404).json({
                message: "Donor profile not found"
            });
        }

        res.json(donor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update donor
const updateDonor = async (req, res) => {
    try {
        const donor = await Donor.findOne({
            user: req.user._id
        });

        if (!donor) {
            return res.status(404).json({
                message: "Donor profile not found"
            });
        }

        const editableFields = [
            "bloodGroup",
            "phone",
            "city",
            "address",
            "age",
            "gender",
            "available",
            "lastDonationDate"
        ];

        for (const field of editableFields) {
            if (req.body[field] !== undefined) {
                donor[field] = req.body[field];
            }
        }

        const updatedDonor = await donor.save();

        res.json(updatedDonor);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Search donors
const searchDonors = async (req, res) => {
    try {
        const { bloodGroup, city } = req.query;

        const filter = {
            available: true
        };

        if (bloodGroup) {
            filter.bloodGroup = bloodGroup;
        }

        if (city) {
            const escapedCity = city.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.city = {
                $regex: escapedCity,
                $options: "i"
            };
        }

        const donors = await Donor.find(filter)
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(donors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all donors - admin
const getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.json(donors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete donor - admin
const deleteDonor = async (req, res) => {
    try {
        const donor = await Donor.findById(req.params.id);

        if (!donor) {
            return res.status(404).json({
                message: "Donor not found"
            });
        }

        await donor.deleteOne();

        res.json({
            message: "Donor deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createDonor,
    getMyDonorProfile,
    updateDonor,
    searchDonors,
    getAllDonors,
    deleteDonor
};