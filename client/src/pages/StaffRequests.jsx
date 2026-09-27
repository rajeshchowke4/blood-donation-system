import { useEffect, useState } from "react";

import { getAllRequests, updateRequestStatus } from "../services/api";

const statuses = ["All", "Pending", "Fulfilled", "Cancelled"];
const requestStatuses = statuses.slice(1);

const StaffRequests = () => {
    const [requests, setRequests] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [isLoading, setIsLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        let isActive = true;

        getAllRequests()
            .then((data) => {
                if (isActive) {
                    setRequests(data);
                }
            })
            .catch((requestError) => {
                if (isActive) {
                    setError(requestError.message);
                }
            })
            .finally(() => {
                if (isActive) {
                    setIsLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    const changeStatus = async (id, status) => {
        setUpdatingId(id);
        setError("");

        try {
            await updateRequestStatus(id, status);
            setRequests((currentRequests) => currentRequests.map((request) =>
                request._id === id ? { ...request, status } : request
            ));
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setUpdatingId(null);
        }
    };

    const visibleRequests = selectedStatus === "All"
        ? requests
        : requests.filter((request) => request.status === selectedStatus);

    return (
        <main className="page staff-page">
            <h1>Blood Requests</h1>

            <div className="staff-filters" aria-label="Filter requests by status">
                {statuses.map((status) => (
                    <button
                        key={status}
                        type="button"
                        className={selectedStatus === status ? "active" : ""}
                        aria-pressed={selectedStatus === status}
                        onClick={() => setSelectedStatus(status)}
                    >
                        {status}
                        <span>
                            {status === "All"
                                ? requests.length
                                : requests.filter((request) => request.status === status).length}
                        </span>
                    </button>
                ))}
            </div>

            {error && <div className="error" role="alert">{error}</div>}
            {isLoading && <p>Loading blood requests...</p>}

            {!isLoading && visibleRequests.length === 0 && (
                <p className="staff-empty">No requests in this status.</p>
            )}

            <div className="admin-list">
                {visibleRequests.map((request) => (
                    <article className="admin-card staff-request" key={request._id}>
                        <div className="staff-request-info">
                            <strong>{request.patientName}</strong>
                            <p>
                                {request.bloodGroup} · {request.unitsRequired} unit(s) · {request.urgency}
                            </p>
                            <p>{request.hospital}, {request.city}</p>
                            <p>Contact: {request.contactNumber}</p>
                            <small>
                                Requested by {request.requester?.name || "Unknown"}
                                {request.createdAt && ` · ${new Date(request.createdAt).toLocaleDateString()}`}
                            </small>
                        </div>

                        <label className="staff-status-control">
                            Status
                            <select
                                value={request.status}
                                onChange={(event) => changeStatus(request._id, event.target.value)}
                                disabled={updatingId === request._id}
                            >
                                {requestStatuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </label>
                    </article>
                ))}
            </div>
        </main>
    );
};

export default StaffRequests;