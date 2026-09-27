import { useEffect, useState } from "react";
import { getMyRequests } from "../services/api";

const MyRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyRequests()
            .then((data) => {
                setRequests(data);
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="page">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="page">
            <h1>My Blood Requests</h1>

            {requests.length === 0 ? (
                <p>
                    You haven't created any blood
                    requests yet.
                </p>
            ) : (
                <div className="request-grid">
                    {requests.map((request) => (
                        <div
                            className="request-card"
                            key={request._id}
                        >
                            <h2>
                                {request.patientName}
                            </h2>

                            <p>
                                Blood Group:{" "}
                                <strong>
                                    {request.bloodGroup}
                                </strong>
                            </p>

                            <p>
                                Units:{" "}
                                {request.unitsRequired}
                            </p>

                            <p>
                                Hospital:{" "}
                                {request.hospital}
                            </p>

                            <p>
                                City: {request.city}
                            </p>

                            <p>
                                Urgency:{" "}
                                {request.urgency}
                            </p>

                            <p>
                                Status:{" "}
                                <strong>
                                    {request.status}
                                </strong>
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRequests;