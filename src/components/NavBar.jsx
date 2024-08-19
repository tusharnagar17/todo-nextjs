"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { IoLogOutOutline } from "react-icons/io5"

const NavBar = () => {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", { method: "POST" })

            if (res.ok) {
                console.log("Successfully Logged Out")
                window.location.reload()
            }
        } catch (error) {
            console.log("error while logging out", error.message)
        }
    }
    return (
        <div className="border-2 flex items-center justify-center relative">
            <div className="text-4xl font-semibold font-mono my-4">ToDo-App</div>
            <div className="absolute items-end right-10">
                <button
                    className="flex gap-2 items-center justify-center text-sm  rounded-xl"
                    onClick={handleLogout}
                >
                    Log Out <IoLogOutOutline size={25} />
                </button>
            </div>
        </div>
    )
}

export default NavBar
