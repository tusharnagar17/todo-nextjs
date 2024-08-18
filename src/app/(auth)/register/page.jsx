"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const blankData = {
    username: "",
    email: "",
    password: "",
}

const RegisterPage = () => {
    const [data, setData] = useState(blankData)
    const [customError, setCustomError] = useState("")

    const router = useRouter()

    const handleInputChange = (ev) => {
        const { name, value } = ev.target

        setData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleFormSubmit = async (ev) => {
        ev.preventDefault()

        // Register Logic
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            const result = await res.json()

            if (res.ok) {
                console.log("Registration Successfully:", result)
                router.push("/")
            } else {
                console.log("Custom Error:", result.error)
                setCustomError(result.error || "An error occured")
            }
        } catch (error) {
            console.error("An unexpected error occured:", error)
            setCustomError("An unexpected error occured:")
        }

        console.log("all Data", data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleFormSubmit}
                className="border lg:w-2/6 md:w-1/2 w-full m-2 shadow-2xl md:px-16 p-10 rounded-xl"
            >
                <h1 className="text-center text-3xl">Register </h1>
                {/* Custom Error */}
                <div className="text-red-500 font-semibold px-2 pt-2">
                    {customError && customError}
                </div>
                <div className="form-input-wrapper">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        placeholder="user111"
                        name="username"
                        value={data.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-input-wrapper">
                    <label htmlFor="email" className="form-label">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="name@gmail.com"
                        name="email"
                        value={data.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-input-wrapper">
                    <label htmlFor="password" className="form-label">
                        Your password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleInputChange}
                        id="password"
                        className="form-input"
                        required
                    />
                </div>

                <button type="submit" className="form-button">
                    Submit
                </button>
                <div className="mt-4 text-sm text-center">
                    Already have account ! {"  "}
                    <span className="text-blue-500 font-medium">
                        <Link href="/login">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
