"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
function Login() {

    const router = useRouter()
    const {login}=useAuth()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [type, setType] = useState("password");
    const [Icon, setIcon] = useState (()=>FaEyeSlash);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    {/*Condition for eye switch*/ }
    const handleToggle = () => {

        if (type === 'password') {
            setIcon(()=>FaEye);
            setType('text');
        }
        else {
            setIcon(()=>FaEyeSlash);
            setType('password');
        }
    };

    //Function to handle login
    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        // Validation
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        //password length check
        if (password.length < 6) {
            setError("Password must be at least 8 characters.");
            return;
        }
        setLoading(true);


        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    gmail: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail);
                return;
            }

            // Login successful
            login(data)
            alert("Login Successful!");
            router.replace("/intro");
            

        } catch (error) {
            console.error(error);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }

    };


    return (
        <div className="flex h-[calc(100vh-72px)]">
            <div className="hidden lg:flex lg:w-1/2 bg-[#EEF2FF] items-center justify-center p-8">
                <div className="text-center">

                    <img
                        src="/to-do list.jpg"
                        alt="Todo Illustration"
                        className="max-w-md mx-auto"
                    />

                    <h2 className="text-3xl font-bold text-gray-800 mt-8">
                        Organize Your Life
                    </h2>

                    <p className="text-gray-600 mt-4 max-w-md">
                        Create your account and start managing your daily tasks
                        efficiently with your personal to-do planner.
                    </p>

                </div>
            </div>

            <div className="w-1/2 bg-linear-to-r from-blue-200 via-blue-500 to-blue-900 dark:bg-linear-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 transition-all duration-300">
                <div className="flex items-center justify-center h-full">
                    <div className="w-107.5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-10">
                        <h1 className="text-4xl font-bold text-white">
                            Welcome!
                        </h1>

                        <p className="text-gray-600 dark:text-300 mt-2">
                            Sign in to continue managing your weekly tasks.
                        </p>

                        <form onSubmit={handleLogin} className="mt-8 space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your Gmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-black dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />


                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-300 text-sm mb-2">
                                    Password
                                </label>
                                <div className="flex items-center px-4 py-3 gap-2 w-full rounded-xl bg-white/10 border border-white/20 text-black dark:text-white placeholder-gray-400 outline-none focus:ring-4 focus:ring-blue-400">   
                                    <input
                                        type={type}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full text-white placeholder-gray-400 outline-none"
                                        required
                                    />
                                    <Icon size={22} onClick={handleToggle} className="cursor-pointer" />
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <p className="text-red-400 text-sm">
                                    {error}
                                </p>
                            )}

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="text-sm text-blue-300 hover:text-blue-200"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            {/* Register Link */}
                            <p className="text-center text-gray-300 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-blue-300 hover:text-blue-200 font-medium"
                                >
                                    Register
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;