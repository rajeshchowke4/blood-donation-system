const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        patientName: {
            type: String,
            required: true
        },

        bloodGroup: {
            type: String,
            enum: [
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-"
            ],
            required: true
        },

        unitsRequired: {
            type: Number,
            required: true,
            min: 1
        },

        hospital: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        contactNumber: {
            type: String,
            required: true
        },

        urgency: {
            type: String,
            enum: ["Normal", "Urgent", "Emergency"],
            default: "Normal"
        },

        status: {
            type: String,
            enum: ["Pending", "Fulfilled", "Cancelled"],
            default: "Pending"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "BloodRequest",
    bloodRequestSchema
);