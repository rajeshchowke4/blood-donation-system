import { useEffect, useState } from "react";

import {
    createUserByAdmin,
    getAllUsers,
    updateUserRole,
    deleteUserByAdmin,
    getAllDonors,
    getAllRequests,
    updateRequestStatus,
    deleteDonor,
    deleteRequest
} from "../services/api";
import useAuth from "../hooks/useAuth";

const AdminDashboard = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [donors, setDonors] = useState([]);
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });
    const [userMessage, setUserMessage] = useState("");
    const [userError, setUserError] = useState("");
    const [isCreatingUser, setIsCreatingUser] = useState(false);

    const loadData = async () => {
        try {
            const donorData = await getAllDonors();
            const requestData = await getAllRequests();

            setDonors(donorData);
            setRequests(requestData);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        let isActive = true;

        Promise.all([
            getAllUsers(),
            getAllDonors(),
            getAllRequests()
        ])
            .then(([userData, donorData, requestData]) => {
                if (!isActive) {
                    return;
                }

                setUsers(userData);
                setDonors(donorData);
                setRequests(requestData);
            })
            .catch((error) => {
                if (isActive) {
                    alert(error.message);
                }
            });

        return () => {
            isActive = false;
        };
    }, []);

    const changeStatus = async (id, status) => {
        try {
            await updateRequestStatus(id, status);
            loadData();
        } catch (error) {
            alert(error.message);
        }
    };

    const removeDonor = async (id) => {
        if (!window.confirm("Delete this donor?")) {
            return;
        }

        try {
            await deleteDonor(id);
            loadData();
        } catch (error) {
            alert(error.message);
        }
    };

    const removeRequest = async (id) => {
        if (!window.confirm("Delete this request?")) {
            return;
        }

        try {
            await deleteRequest(id);
            loadData();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setUserMessage("");
        setUserError("");
        setIsCreatingUser(true);

        try {
            const user = await createUserByAdmin(newUser);
            setUsers((currentUsers) => [user, ...currentUsers]);
            setUserMessage(`Created account for ${user.name}.`);
            setNewUser({ name: "", email: "", password: "", role: "user" });
        } catch (error) {
            setUserError(error.message);
        } finally {
            setIsCreatingUser(false);
        }
    };

    const changeUserRole = async (id, role) => {
        try {
            const updatedUser = await updateUserRole(id, role);
            setUsers((currentUsers) => currentUsers.map((item) =>
                item._id === updatedUser._id ? updatedUser : item
            ));
        } catch (error) {
            alert(error.message);
        }
    };

    const removeUser = async (id, name) => {
        if (!window.confirm(`Delete ${name}'s account and associated donor profile and blood requests?`)) {
            return;
        }

        try {
            await deleteUserByAdmin(id);
            setUsers((currentUsers) => currentUsers.filter((item) => item._id !== id));
        } catch (error) {
            alert(error.message);
        }
    };

    const renderUserRow = (item) => {
        const isCurrentUser = item._id === currentUser?._id;

        return (
            <div className="admin-card" key={item._id}>
                <div>
                    <strong>{item.name}</strong>
                    <p>{item.email}</p>
                    <small>Joined {new Date(item.createdAt).toLocaleDateString()}</small>
                </div>

                <div className="admin-actions">
                    <select
                        aria-label={`Role for ${item.name}`}
                        value={item.role}
                        onChange={(event) => changeUserRole(item._id, event.target.value)}
                        disabled={isCurrentUser}
                    >
                        <option value="user">User</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button
                        className="danger"
                        onClick={() => removeUser(item._id, item.name)}
                        disabled={isCurrentUser}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    };

    const staffUsers = users.filter((item) => item.role === "staff");
    const regularUsers = users.filter((item) => item.role !== "staff");
    const matchesSearch = (...values) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return !normalizedSearch || values.some((value) =>
            String(value ?? "").toLowerCase().includes(normalizedSearch)
        );
    };
    const filteredUsers = regularUsers.filter((item) =>
        matchesSearch(item.name, item.email, item.role)
    );
    const filteredStaff = staffUsers.filter((item) =>
        matchesSearch(item.name, item.email)
    );
    const filteredDonors = donors.filter((donor) =>
        matchesSearch(
            donor.user?.name,
            donor.bloodGroup,
            donor.city,
            donor.phone,
            donor.address
        )
    );
    const filteredRequests = requests.filter((request) =>
        matchesSearch(
            request.patientName,
            request.bloodGroup,
            request.hospital,
            request.city,
            request.contactNumber,
            request.urgency,
            request.status,
            request.requester?.name
        )
    );

    return (
        <div className="page">
            <h1>Admin Dashboard</h1>

            <label className="admin-search">
                Search dashboard
                <input
                    type="search"
                    placeholder="Name, email, blood group, city, status..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </label>

            <section>
                <h2>Create User</h2>

                {userMessage && <div className="success">{userMessage}</div>}
                {userError && <div className="error">{userError}</div>}

                <form className="admin-user-form" onSubmit={handleCreateUser}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={newUser.name}
                            onChange={(event) => setNewUser({
                                ...newUser,
                                name: event.target.value
                            })}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            value={newUser.email}
                            onChange={(event) => setNewUser({
                                ...newUser,
                                email: event.target.value
                            })}
                            required
                        />
                    </label>

                    <label>
                        Temporary password
                        <input
                            type="password"
                            value={newUser.password}
                            onChange={(event) => setNewUser({
                                ...newUser,
                                password: event.target.value
                            })}
                            minLength={6}
                            required
                        />
                    </label>

                    <label>
                        Role
                        <select
                            value={newUser.role}
                            onChange={(event) => setNewUser({
                                ...newUser,
                                role: event.target.value
                            })}
                        >
                            <option value="user">User</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <button type="submit" disabled={isCreatingUser}>
                        {isCreatingUser ? "Creating..." : "Create User"}
                    </button>
                </form>
            </section>

            <section>
                <h2>Users ({filteredUsers.length})</h2>

                <div className="admin-list">
                    {filteredUsers.map(renderUserRow)}
                    {filteredUsers.length === 0 && (
                        <p>{searchTerm ? "No users match your search." : "No users yet."}</p>
                    )}
                </div>
            </section>

            <section>
                <h2>Staff ({filteredStaff.length})</h2>

                <div className="admin-list">
                    {filteredStaff.map(renderUserRow)}
                    {filteredStaff.length === 0 && (
                        <p>{searchTerm ? "No staff match your search." : "No staff accounts yet."}</p>
                    )}
                </div>
            </section>

            <section>
                <h2>Donors</h2>

                <div className="admin-list">
                    {filteredDonors.map((donor) => (
                        <div
                            className="admin-card"
                            key={donor._id}
                        >
                            <div>
                                <strong>
                                    {donor.user?.name}
                                </strong>

                                <p>
                                    {donor.bloodGroup} |{" "}
                                    {donor.city} |{" "}
                                    {donor.phone}
                                </p>
                            </div>

                            <button
                                className="danger"
                                onClick={() =>
                                    removeDonor(
                                        donor._id
                                    )
                                }
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    {filteredDonors.length === 0 && (
                        <p>{searchTerm ? "No donors match your search." : "No donors yet."}</p>
                    )}
                </div>
            </section>

            <section>
                <h2>Blood Requests</h2>

                <div className="admin-list">
                    {filteredRequests.map((request) => (
                        <div
                            className="admin-card"
                            key={request._id}
                        >
                            <div>
                                <strong>
                                    {request.patientName}
                                </strong>

                                <p>
                                    {request.bloodGroup} |{" "}
                                    {request.hospital} |{" "}
                                    {request.city}
                                </p>

                                <p>
                                    Status:{" "}
                                    {request.status}
                                </p>
                            </div>

                            <div className="admin-actions">
                                <select
                                    value={request.status}
                                    onChange={(e) =>
                                        changeStatus(
                                            request._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    <option>
                                        Pending
                                    </option>
                                    <option>
                                        Fulfilled
                                    </option>
                                    <option>
                                        Cancelled
                                    </option>
                                </select>

                                <button
                                    className="danger"
                                    onClick={() =>
                                        removeRequest(
                                            request._id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredRequests.length === 0 && (
                        <p>{searchTerm ? "No blood requests match your search." : "No blood requests yet."}</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;