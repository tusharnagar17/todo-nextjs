import { Inter } from "next/font/google"
import "./globals.css"
import client from "./../lib/mongodb"

const inter = Inter({ subsets: ["latin"] })

const getConnectionStatus = async () => {
    try {
        await client.connect()

        return true
    } catch (error) {
        console.error(e)
        return false
    }
}

export const metadata = {
    title: "Todo App -Next.js",
    description: "Todo app built with nextjs",
}

export default function RootLayout({ children }) {
    const isConnected = getConnectionStatus()
    return (
        <html lang="en">
            <body className={inter.className}>
                {isConnected ? (
                    children
                ) : (
                    <div className="flex min-h-screen items-center justify-center">
                        {" "}
                        You are NOT connected to MongoDB. Check the README.md for instructions.
                    </div>
                )}
            </body>
        </html>
    )
}
