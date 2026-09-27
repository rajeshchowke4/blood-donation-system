const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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

        phone: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        address: {
            type: String
        },

        age: {
            type: Number,
            required: true
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            required: true
        },

        available: {
            type: Boolean,
            default: true
        },

        lastDonationDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Donor", donorSchema);