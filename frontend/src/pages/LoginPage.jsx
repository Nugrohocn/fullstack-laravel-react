import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../components/Login";

const LoginPage = () => {
    return (
        <AuthLayouts title={"Login"} type={"login"}>
            <Login />
        </AuthLayouts>
    );
};

export default LoginPage;
