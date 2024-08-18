export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).end()
    }

    res.setHeader("Set-Cookie", ["token=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict"])

    res.status(200).json({ message: "Logged out successfully" })
}
