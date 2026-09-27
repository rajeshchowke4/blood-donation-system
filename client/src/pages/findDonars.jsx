import { useState } from "react";
import { searchDonors } from "../services/api";

const FindDonors = () => {
    const [bloodGroup, setBloodGroup] = useState("");
    const [city, setCity] = useState("");
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const data = await searchDonors(
                bloodGroup,
                city
            );

            setDonors(data);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page">
            <h1>Find Blood Donors</h1>

            <form
                className="search-form"
                onSubmit={handleSearch}
            >
                <select
                    value={bloodGroup}
                    onChange={(e) =>
                        setBloodGroup(e.target.value)
                    }
                >
                    <option value="">
                        All Blood Groups
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
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) =>
                        setCity(e.target.value)
                    }
                />

                <button type="submit">
                    Search
                </button>
            </form>

            {loading && <p>Searching...</p>}

            <div className="donor-grid">
                {donors.map((donor) => (
                    <div
                        className="donor-card"
                        key={donor._id}
                    >
                        <h2>
                            {donor.user?.name}
                        </h2>

                        <div className="blood-group">
                            {donor.bloodGroup}
                        </div>

                        <p>
                            <strong>City:</strong>{" "}
                            {donor.city}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {donor.phone}
                        </p>

                        <p>
                            <strong>Age:</strong>{" "}
                            {donor.age}
                        </p>

                        <p>
                            <strong>Gender:</strong>{" "}
                            {donor.gender}
                        </p>

                        <p>
                            <strong>Available:</strong>{" "}
                            {donor.available
                                ? "Yes"
                                : "No"}
                        </p>
                    </div>
                ))}
            </div>

            {!loading &&
                donors.length === 0 && (
                    <p>
                        No donors found. Try another
                        blood group or city.
                    </p>
                )}
        </div>
    );
};

export default FindDonors;