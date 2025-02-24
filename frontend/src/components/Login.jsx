import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import Input from "./ui/Input";
import Button from "./ui/Button";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Fungsi untuk validasi input
    const validateInput = () => {
        if (!username) {
            return "Username tidak boleh kosong!";
        }
        if (username.length < 3 || username.length > 255) {
            return "Username harus antara 3 hingga 255 karakter!";
        }

        // Validasi Password
        if (!password) {
            return "Password tidak boleh kosong!";
        }
        if (password.length < 6 || password.length > 255) {
            return "Password harus antara 6 hingga 255 karakter!";
        }

        return null;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validasi input
        const validationError = validateInput();
        if (validationError) {
            setError(validationError);
            toast.error(validationError);
            return;
        }

        try {
            await login(username, password);
            toast.success("Login sukses!");
            navigate("/dashboard");
        } catch (err) {
            console.log(err.response.data);
            toast.error("Username dan Password Salah");
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
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
                <Button
                    variant="bg-gradient-to-r from-blue-600 to-purple-600 w-full mt-4"
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default Login;
