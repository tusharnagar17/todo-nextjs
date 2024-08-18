import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import User from "@/lib/models/user"

export async function authenticate(req) {
    const token = req.cookies.get("token")

    const protectedPaths = ["/"]

    // Check if the request URL matches any of the protected paths
    if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
        if (!token) {
            // Redirect to login page if no token is present
            return NextResponse.redirect(new URL("/login", req.url))
        }

        try {
            // Verify the JWT token
            const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET)
            const user = await User.findById(decoded.userId).lean()
            if (!user) {
                return NextResponse.redirect(new URL("/login", req.url))
            }
            return NextResponse.next() // Allow the request to proceed
        } catch (error) {
            console.error("Invalid token:", error)
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/"],
}
