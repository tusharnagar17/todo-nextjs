import mongoose from "mongoose"

const { Schema } = mongoose

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        default: "todo",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

const Todo = mongoose.model("Todo", TodoSchema)

export default Todo
