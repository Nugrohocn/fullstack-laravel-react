import AuthLayouts from "../layouts/AuthLayouts";
import Register from "../components/Register";

const RegisterPage = () => {
    return (
        <AuthLayouts title={"Register"} type={"register"}>
            <Register />
        </AuthLayouts>
    );
};

export default RegisterPage;
