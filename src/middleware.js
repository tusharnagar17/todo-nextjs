import { NextResponse } from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
    const token = request.cookies.get("token")

    if (!token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    try {
        // Verify the token
        const { payload } = await jwtVerify(
            token.value,
            new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
        )

        const response = NextResponse.next()
        response.headers.set("x-user", JSON.stringify(payload))
        return response
    } catch (error) {
        console.error("Invalid or expired token:", error)

        return NextResponse.redirect(new URL("/login", request.url))
    }
}

export const config = {
    matcher: ["/", "/api/todo/:path*"],
}
