import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { serialize } from "cookie"
import User from "@/lib/models/user"

export async function POST(req) {
    try {
        const { email, password } = await req.json()

        const user = await User.findOne({ email })

        if (!user) {
            return new Response(JSON.stringify({ error: "User doesn't exists!" }), {
                status: 401,
            })
        }

        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return new Response(JSON.stringify({ error: "Invalid email or password" }), {
                status: 401,
            })
        }

        const token = jwt.sign(
            { userId: user._id, userName: user.username },
            process.env.NEXT_PUBLIC_JWT_SECRET,
            { expiresIn: "7d" }
        )

        const headers = new Headers()
        headers.append(
            "Set-Cookie",
            serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: "/",
            })
        )

        return new Response(JSON.stringify({ message: "Login Successful" }), {
            headers,
            status: 200,
        })
    } catch (error) {
        console.error("Error handling login request:", error)
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
}
