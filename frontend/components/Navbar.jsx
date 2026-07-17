"use client"
import Theme from "./Theme"
import Logout from "./Logout"
import { usePathname } from "next/navigation"
import { FaHouse } from "react-icons/fa6"
import { useRouter } from "next/navigation"
function NavBar() {
    const path = usePathname();
    const router =useRouter();
    return (
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b  px-4 py-3 shadow-xl backdrop-blur-lg transition-all duration-300 dark:border-gray-800 bg-zinc-900/90 md:px-8">
            {/* Logo */}
            <div className="bg-linear-to-r from-[#66A3FF] via-[#3385FF] to-[#0025CC] bg-clip-text text-xl font-extrabold text-transparent md:text-3xl">
                To-Do Weekly List
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6">
                {path !== "/login" && path !== "/register" && path !=="intro" && <FaHouse size={25} onClick={()=>router.push("/intro")} className="text-white cursor-pointer hover:text-gray-300"/>}
                <Theme />
                {path !== "/login" && path !== "/register" && <Logout />}
                
            </div>
        </nav>
    )
}

export default NavBar