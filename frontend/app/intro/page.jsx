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
        <div className="flex flex-col items-center gap-6 px-4 py-8 sm:py-12">
            <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Choose day for interest</h1>
            <div className="flex flex-col gap-4 w-full max-w-lg">
                {days.map((day) => (
                    <button
                        className="
                            w-full
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            dark:bg-gray-800
                            dark:border-gray-700

                            p-5
                            sm:p-6

                            text-lg
                            font-semibold

                            text-slate-700
                            dark:text-white

                            shadow-sm
                            hover:shadow-xl

                            transition-all
                            duration-300

                            hover:bg-linear-to-r
                            hover:from-indigo-500
                            hover:via-purple-500
                            hover:to-pink-500

                            hover:text-white
                            hover:border-transparent

                            hover:-translate-y-1
                            active:scale-95 cursor-pointer"

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