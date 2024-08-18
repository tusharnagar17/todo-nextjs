import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { jwtVerify } from "jose"

export async function middleware(request) {
    const token = request.cookies.get("token")
    console.log("token", token)

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    try {
        // Verify the token
        const { payload } = await jwtVerify(
            token.value,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        )

        console.log("Token is valid. Decoded data:", payload)

        return NextResponse.next()
    } catch (error) {
        console.error("Invalid or expired token:", error)

        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: ["/", "/login"],
}
