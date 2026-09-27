const API_URL = "http://localhost:5000/api";

const request = async (url, options = {}) => {
    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};

const getToken = () => {
    return localStorage.getItem("token");
};

export const registerUser = (userData) => {
    return request("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const createUserByAdmin = (userData) => {
    return request("/auth/users", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(userData)
    });
};

export const getAllUsers = () => {
    return request("/auth/users", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const updateUserRole = (id, role) => {
    return request(`/auth/users/${id}/role`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ role })
    });
};

export const deleteUserByAdmin = (id) => {
    return request(`/auth/users/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const loginUser = (userData) => {
    return request("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData)
    });
};

export const getCurrentUser = () => {
    return request("/auth/me", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const createDonor = (donorData) => {
    return request("/donors", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(donorData)
    });
};

export const getMyDonor = () => {
    return request("/donors/me", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const updateDonor = (donorData) => {
    return request("/donors/me", {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(donorData)
    });
};

export const searchDonors = (bloodGroup, city) => {
    const params = new URLSearchParams();

    if (bloodGroup) {
        params.append("bloodGroup", bloodGroup);
    }

    if (city) {
        params.append("city", city);
    }

    return request(`/donors/search?${params.toString()}`);
};

export const createBloodRequest = (requestData) => {
    return request("/requests", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(requestData)
    });
};

export const getMyRequests = () => {
    return request("/requests/my", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const getAllDonors = () => {
    return request("/donors", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const getAllRequests = () => {
    return request("/requests", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const updateRequestStatus = (id, status) => {
    return request(`/requests/${id}/status`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ status })
    });
};

export const deleteDonor = (id) => {
    return request(`/donors/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};

export const deleteRequest = (id) => {
    return request(`/requests/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
};