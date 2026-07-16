"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

function Logout() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    
    if (!user) return null;
    const handleLogout = () => {
        logout();
        router.replace("/login");
    };


    return (
        <div className="relative">
            <FaUserCircle
                size={34}
                className="text-white cursor-pointer"
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-black/40 shadow-xl">

                    <div className="p-4 border-b text-blue-700">
                        {user.gmail}
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left p-4 hover:bg-gray-100 hover:text-black text-white transition-all"
                    >
                        Logout
                    </button>

                </div>
            )}
        </div>
    );
}

export default Logout;