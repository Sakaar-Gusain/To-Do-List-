"use client"
import Theme from "./Theme"
import Logout from "./Logout"
import { usePathname } from "next/navigation"
function NavBar() {
    const path = usePathname();
    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-zinc-600/60 px-4 py-3 shadow-md backdrop-blur-lg transition-all duration-300 dark:border-gray-800 dark:bg-zinc-900/80 md:px-8">
            {/* Logo */}
            <div className="bg-linear-to-r from-[#66A3FF] via-[#3385FF] to-[#0025CC] bg-clip-text text-xl font-extrabold text-transparent md:text-3xl">
                To-Do Weekly List
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6">
                <Theme />
                {path !== "/login" && path !== "/register" && <Logout />}
            </div>
        </nav>
    )
}

export default NavBar