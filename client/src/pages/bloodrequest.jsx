import { useState } from "react";

import {
    createBloodRequest
} from "../services/api";

const BloodRequest = () => {
    const [form, setForm] = useState({
        patientName: "",
        bloodGroup: "",
        unitsRequired: 1,
        hospital: "",
        city: "",
        contactNumber: "",
        urgency: "Normal"
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            await createBloodRequest(form);

            setMessage(
                "Blood request created successfully"
            );

            setForm({
                patientName: "",
                bloodGroup: "",
                unitsRequired: 1,
                hospital: "",
                city: "",
                contactNumber: "",
                urgency: "Normal"
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-page">
            <h1>Request Blood</h1>

            {message && (
                <div className="success">
                    {message}
                </div>
            )}

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={form.patientName}
                    onChange={handleChange}
                    required
                />

                <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Required Blood Group
                    </option>

                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                </select>

                <input
                    type="number"
                    name="unitsRequired"
                    min="1"
                    placeholder="Units Required"
                    value={form.unitsRequired}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="hospital"
                    placeholder="Hospital Name"
                    value={form.hospital}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={form.contactNumber}
                    onChange={handleChange}
                    required
                />

                <select
                    name="urgency"
                    value={form.urgency}
                    onChange={handleChange}
                >
                    <option>Normal</option>
                    <option>Urgent</option>
                    <option>Emergency</option>
                </select>

                <button type="submit">
                    Submit Blood Request
                </button>
            </form>
        </div>
    );
};

export default BloodRequest;