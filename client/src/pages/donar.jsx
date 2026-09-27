import { useEffect, useState } from "react";

import {
    createDonor,
    getMyDonor,
    updateDonor
} from "../services/api";

const initialForm = {
    bloodGroup: "",
    phone: "",
    city: "",
    address: "",
    age: "",
    gender: "Male",
    available: true,
    lastDonationDate: ""
};

const Donor = () => {
    const [form, setForm] = useState(initialForm);
    const [exists, setExists] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        getMyDonor()
            .then((data) => {
                setForm({
                    bloodGroup: data.bloodGroup || "",
                    phone: data.phone || "",
                    city: data.city || "",
                    address: data.address || "",
                    age: data.age || "",
                    gender: data.gender || "Male",
                    available: data.available,
                    lastDonationDate:
                        data.lastDonationDate
                            ? data.lastDonationDate.substring(0, 10)
                            : ""
                });

                setExists(true);
            })
            .catch(() => {
                setExists(false);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            if (exists) {
                await updateDonor(form);
                setMessage("Donor profile updated successfully");
            } else {
                await createDonor(form);
                setExists(true);
                setMessage("Donor profile created successfully");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="form-page">
            <h1>Donor Profile</h1>

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
                <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Blood Group
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
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
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
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    min="18"
                    required
                />

                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>

                <label className="checkbox">
                    <input
                        type="checkbox"
                        name="available"
                        checked={form.available}
                        onChange={handleChange}
                    />
                    Available for donation
                </label>

                <label>
                    Last Donation Date
                </label>

                <input
                    type="date"
                    name="lastDonationDate"
                    value={form.lastDonationDate}
                    onChange={handleChange}
                />

                <button type="submit">
                    {exists
                        ? "Update Profile"
                        : "Create Donor Profile"}
                </button>
            </form>
        </div>
    );
};

export default Donor;