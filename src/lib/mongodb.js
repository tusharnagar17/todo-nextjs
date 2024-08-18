import { MongoClient } from "mongodb"

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI
const options = {}

let client

if (process.env.NODE_ENV === "development") {
    // In development mode,
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(uri, options)
    }
    client = global._mongoClient
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
}

export default client
