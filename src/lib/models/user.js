import mongoose from "mongoose"

const { Schema } = mongoose

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        todos: [
            {
                type: Schema.Types.ObjectId,
                ref: "Todo",
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
    // { bufferCommands: false, autoCreate: false }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User
