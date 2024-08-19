import { Inter } from "next/font/google"
import "./globals.css"
import isConnectedMongoose from "./../lib/mongodb"
import { ReduxProvider } from "./_app"

const inter = Inter({ subsets: ["latin"] })

const getConnectionStatus = async () => {
    try {
        // await client.connect()
        await isConnectedMongoose
        return true
    } catch (e) {
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
        <ReduxProvider>
            <html lang="en">
                <body
                    className={`${inter.className} bg-gradient-to-br from-blue-300 via-violet-300 to-green-300 min-h-screen`}
                >
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
        </ReduxProvider>
    )
}
