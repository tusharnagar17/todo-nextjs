import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"
import { NextResponse } from "next/server"
import User from "@/lib/models/user"

export async function POST(req) {
    const { username, email, password } = await req.json()

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return NextResponse.json(
                { error: "User Already exists with this email." },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.NEXT_PUBLIC_SALT, 10)
        )

        // Create User
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        })

        await newUser.save()

        const token = jwt.sign(
            { userId: newUser._id, userName: newUser.username },
            process.env.NEXT_PUBLIC_JWT_SECRET,
            {
                expiresIn: "1h",
            }
        )

        const response = NextResponse.json(
            { message: "User created successfully!" },
            { status: 201 }
        )

        response.headers.set(
            "Set-Cookie",
            serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            })
        )

        return response
    } catch (error) {
        console.error("Error creating user:", error)
        return NextResponse.json(
            { error: "An error occurred while creating the user." },
            { status: 500 }
        )
    }
}
