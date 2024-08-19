import mongoose from "mongoose"

if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_MONGODB_URI"')
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI
const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}

let isConnectedMongoose // Track the connection status

// Use a global variable to preserve the Mongoose connection in development mode
if (process.env.NODE_ENV === "development") {
    if (!global._mongooseConnection) {
        global._mongooseConnection = mongoose.connect(uri, options)
        isConnectedMongoose = global._mongooseConnection
    } else {
        isConnectedMongoose = global._mongooseConnection
    }
} else {
    isConnectedMongoose = mongoose.connect(uri, options)
}

export default isConnectedMongoose
