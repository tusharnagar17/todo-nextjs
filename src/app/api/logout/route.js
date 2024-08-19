import { serialize } from "cookie"

export async function POST(req) {
    try {
        // Clear the token cookie
        const headers = new Headers()
        headers.append(
            "Set-Cookie",
            serialize("token", "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                expires: new Date(0), // Set expiry date to the past
                path: "/",
            })
        )

        return new Response(JSON.stringify({ message: "Logout Successful" }), {
            headers,
            status: 200,
        })
    } catch (error) {
        console.error("Error handling logout request:", error)
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
}
