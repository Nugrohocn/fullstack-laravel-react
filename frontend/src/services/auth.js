import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Register User
export const register = async (username, email, nama, password) => {
    return await axios.post(
        `${API_URL}/register`,
        {
            username: username,
            email: email,
            nama: nama,
            password: password,
        },
        {
            headers: { "Content-Type": "application/json" },
        }
    );
};

// Login User
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
    });
    localStorage.setItem("token", response.data.access_token);
    return response.data;
};

// Logout User
export const logout = async () => {
    const token = localStorage.getItem("token");
    return await axios.post(
        `${API_URL}/logout`,
        {},
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
};

// Get User Data
export const getUser = async () => {
    const token = localStorage.getItem("token");
    return await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Mengambil Semua User
export const getUsers = async () => {
    const token = localStorage.getItem("token");
    return await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Hapus User
export const deleteUser = async (id) => {
    const token = localStorage.getItem("token");
    return await axios.delete(`${API_URL}/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Update User
export const updateUser = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    return await axios.put(`${API_URL}/user/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
