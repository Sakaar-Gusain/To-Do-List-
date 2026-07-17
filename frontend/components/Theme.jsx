"use client"
import { useTheme } from "next-themes";
import { FaSun,FaMoon } from "react-icons/fa";
import { Button } from "./ui/button"

function Theme(){
    const {theme,setTheme}=useTheme();

    return(
        <Button variant="outline" size="icon" className="rounded-full bg-white dark:bg-black border-2 border-black dark:border-white cursor-pointer" onClick={()=>setTheme(theme==="light"?"dark":"light")}>
           
           {theme==="light" ? <FaSun size={25} className="h-4 w-4 text-amber-400"></FaSun> :
            <FaMoon size={25} className="h-4 w-4"></FaMoon>}
        
        </Button>
    );
}

export default Theme;