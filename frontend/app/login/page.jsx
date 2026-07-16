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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
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
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">
            <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-sky-100 via-blue-100 to-indigo-200 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950 items-center justify-center p-10">
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

            <div className="w-full lg:w-1/2 bg-linear-to-br from-blue-50 via-blue-100 to-indigo-200 dark:from-black dark:via-gray-900 dark:to-blue-900 transition-all duration-300">
                <div className="flex items-center justify-center min-h-screen lg:min-h-full px-5 py-10">
                    <div className="w-full max-w-md rounded-3xl bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-white/40 dark:border-white/20 shadow-2xl p-6 sm:p-8">
                       <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            Welcome!
                        </h1>

                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Sign in to continue managing your weekly tasks.
                        </p>

                        <form onSubmit={handleLogin} className="mt-8 space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your Gmail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />


                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="flex items-center gap-2 w-full rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">   
                                    <input
                                        type={type}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none"
                                        required
                                    />
                                    <Icon size={22} onClick={handleToggle} className="cursor-pointer text-gray-500 dark:text-gray-300" />
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
                                    className="text-sm text-blue-600 dark:text-blue-300 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            {/* Register Link */}
                            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-blue-600 dark:text-blue-300 hover:underline"
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