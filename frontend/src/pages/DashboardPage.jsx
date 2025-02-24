import { useEffect, useState } from "react";
import { getUsers, logout, deleteUser, updateUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaSort } from "react-icons/fa";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState("username");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState({
        id: "",
        username: "",
        password: "",
        email: "",
        nama: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        getUsers()
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
            })
            .catch(() => navigate("/login"));
    }, []);

    const handleLogout = async () => {
        await logout();
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            try {
                await deleteUser(id);
                const updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Gagal menghapus user!");
            }
        }
    };

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            // Jika password kosong, hapus field password dari editData
            const dataToUpdate = { ...editData };
            if (!dataToUpdate.password) {
                delete dataToUpdate.password;
            }

            // Kirim data yang sudah difilter ke backend
            const response = await updateUser(editData.id, dataToUpdate);

            // Update state users dengan data terbaru dari response
            const updatedUsers = users.map((user) =>
                user.id === editData.id ? response.data : user
            );

            // Perbarui state users dan filteredUsers
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);

            // Tutup modal
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Gagal mengupdate user!");
        }
    };
    useEffect(() => {
        const filtered = users.filter((user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchQuery, users]);

    const handleSort = (field) => {
        const order =
            sortField === field && sortOrder === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortOrder(order);

        const sortedUsers = [...filteredUsers].sort((a, b) => {
            if (a[field] < b[field]) return order === "asc" ? -1 : 1;
            if (a[field] > b[field]) return order === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredUsers(sortedUsers);
    };

    return (
        <div className="flex justify-center min-h-screen items-start p-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="w-full max-w-6xl">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text text-center flex-1 mb-4">
                    User Management
                </h1>

                <div className="flex justify-end items-center mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg placeholder:text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <button
                            className="bg-gradient-to-r from-blue-600 to-purple-800 text-white px-4 py-2 rounded-lg ml-4"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-blue-600 to-purple-800 text-white">
                            <tr>
                                <th
                                    className="px-6 py-4 text-left cursor-pointer"
                                    onClick={() => handleSort("username")}
                                >
                                    Username <FaSort className="inline ml-1" />
                                </th>
                                <th className="px-6 py-4 text-left">
                                    Password
                                </th>
                                <th
                                    className="px-6 py-4 text-left cursor-pointer"
                                    onClick={() => handleSort("email")}
                                >
                                    Email <FaSort className="inline ml-1" />
                                </th>
                                <th className="px-6 py-4 text-left">Nama</th>
                                <th className="px-6 py-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.password
                                            ? user.password
                                            : "********"}
                                    </td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.nama}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="p-2 bg-blue-500 text-white rounded-lg mr-2"
                                            onClick={() => {
                                                setIsModalOpen(true);
                                                setEditData({
                                                    id: user.id,
                                                    username: user.username,
                                                    password: "",
                                                    email: user.email,
                                                    nama: user.nama,
                                                });
                                            }}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="p-2 bg-red-500 text-white rounded-lg"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text text-center mb-4">
                        Edit Data User
                    </h1>
                    <Input
                        type="text"
                        label="Username"
                        name="username"
                        placeholder={"Masukkan Username"}
                        value={editData.username}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder={"Kosongkan jika tidak ingin mengubah"}
                        value={editData.password}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        label="Email"
                        name="email"
                        placeholder={"Masukkan Email"}
                        value={editData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        label="Nama"
                        name="nama"
                        placeholder={"Masukkan Nama Lengkap"}
                        value={editData.nama}
                        onChange={handleChange}
                    />
                    <Button
                        variant="bg-gradient-to-r from-blue-600 to-purple-600 w-full mt-4"
                        type="button"
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;
