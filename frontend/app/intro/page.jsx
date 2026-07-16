"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";


export default function Intro() {
    const router = useRouter();
    const {user}=useAuth();

    useEffect(() => {
        if (!user) {
            router.replace("/login");
        }
    }, [user, router]);

    if (!user) return null;

    const days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    return (
        <div className="flex flex-col items-center gap-6 py-8 ">
            <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Choose day for interest</h1>
            <div className="flex flex-col gap-4 w-full max-w-md px-4">
                {days.map((day) => (
                    <button
                        className="w-full rounded-2xl dark:bg-gray-700/60
                             text-slate-400
                          bg-white
                            border
                          border-slate-200
                            
                          dark:border-purple-500/30
                            duration-300
                            dark:hover:bg-linear-to-r dark:hover:from-purple-600 dark:hover:to-pink-600
                            dark:hover:border-transparent
                            dark:hover:shadow-lg dark:hover:shadow-purple-500/30
                            dark:hover:-translate-y-1 p-5 font-semibold dark:text-white cursor-pointer"
                        key={day}
                        onClick={() => router.push(`/list/${day.toLowerCase()}`)}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    );
}