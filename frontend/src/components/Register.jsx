import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [nama, setNama] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fungsi untuk validasi input
    const validateInput = () => {
        // Validasi Username
        if (!username) {
            return "Username tidak boleh kosong!";
        }
        if (username.length < 3 || username.length > 255) {
            return "Username harus antara 3 hingga 255 karakter!";
        }
        if (!/^[a-zA-Z0-9_.]+$/.test(username)) {
            return "Username hanya boleh mengandung huruf, angka, underscore (_), atau titik (.)!";
        }

        // Validasi Password
        if (!password) {
            return "Password tidak boleh kosong!";
        }
        if (password.length < 6 || password.length > 255) {
            return "Password harus antara 6 hingga 255 karakter!";
        }

        // Validasi Email
        if (!email) {
            return "Email tidak boleh kosong!";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return "Email tidak valid!";
        }

        // Validasi Nama
        if (!nama) {
            return "Nama tidak boleh kosong!";
        }
        if (nama.length < 2 || nama.length > 255) {
            return "Nama harus antara 2 hingga 255 karakter!";
        }

        return null; // Jika semua validasi berhasil
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validasi input
        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            toast.error(validationError);
            return;
        }

        try {
            await register(username, email, nama, password);
            toast.success("Registrasi berhasil! Silahkan Login");
            navigate("/login");
        } catch (err) {
            console.log(err.response.data);
            toast.error("Registrasi gagal. Coba lagi.");
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <Input
                    label={"Username"}
                    type="text"
                    placeholder="Masukkan Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label={"Password"}
                    type="password"
                    placeholder="Masukkan Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                    label={"Email"}
                    type="email"
                    placeholder="Masukkan Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    label={"Nama"}
                    type="text"
                    placeholder="Masukkan Nama Lengkap"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                />

                <Button
                    variant="bg-gradient-to-r from-blue-600 to-purple-600 w-full mt-4"
                    type="submit"
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default Register;
