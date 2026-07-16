"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye,FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/register", {
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
                setError(data.detail || "Registration failed.");
                return;
            }

            alert("Account created successfully!");

            router.push("/login");
        } catch (err) {
            setError("Cannot connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-72px)]">

            {/* Left Side */}
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

            {/* Right Side */}
            <div className="flex-1 bg-linear-to-r from-blue-200 via-blue-500 to-blue-900 dark:bg-linear-to-br dark:from-black dark:via-gray-900 dark:to-blue-900 transition-all duration-300 flex justify-center items-center p-8">

                <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8">

                    <h1 className="text-4xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-300 mt-2">
                        Register to continue using the application.
                    </p>

                    <form
                        onSubmit={handleRegister}
                        className="mt-8 space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-sm text-gray-200 mb-2">
                                email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-200 mb-2">
                                Password
                            </label>
                            <div className="flex items-center px-4 py-3 gap-2 w-full rounded-xl bg-white/10 border border-white/20 text-black dark:text-white placeholder-gray-400 outline-none focus:ring-4 focus:ring-blue-400">
                                <input
                                    type={type}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full  text-white placeholder-gray-400 outline-none"
                                    required
                                />
                                <Icon size={22} onClick={handleToggle} className="cursor-pointer" />
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm text-gray-200 mb-2">
                                Confirm Password
                            </label>
                            
                            <input
                                type={type}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
                                
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-red-400 text-sm">
                                {error}
                            </p>
                        )}

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                        {/* Login Link */}
                        <p className="text-center text-gray-300 text-sm">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-300 hover:text-blue-200 font-medium"
                            >
                                Login
                            </Link>
                        </p>
                    </form>

                </div>

            </div>

        </div>
    );
}