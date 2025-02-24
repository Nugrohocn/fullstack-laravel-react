import { Link } from "react-router";

function AuthLayouts({ children, title, type }) {
    return (
        <div className="flex justify-center min-h-screen items-center ">
            <div className="w-full max-w-md shadow-2xl px-8 mx-4 py-12">
                <h1 className=" text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text text-center ">
                    {title}
                </h1>

                {children}
                <p className="text-sm mt-5  text-center">
                    {type === "login"
                        ? " Don't have an Account ?"
                        : "Already have an account ? "}
                    {type === "login" && (
                        <Link
                            to="/register"
                            className="font-bold bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text"
                        >
                            <span className="ml-2">Register</span>
                        </Link>
                    )}
                    {type === "register" && (
                        <Link to="/login" className="font-bold text-blue-600">
                            Login
                        </Link>
                    )}
                </p>
            </div>
        </div>
    );
}

export default AuthLayouts;
