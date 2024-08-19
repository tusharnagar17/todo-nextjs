import Task from "@/components/Task"
import Todo from "@/lib/models/todo"
import User from "@/lib/models/user"
import mongoose from "mongoose"

export async function GET(req) {
    try {
        const user = JSON.parse(req.headers.get("x-user"))

        const tempUser = await User.findOne({ username: user.userName })
        const todos = await Todo.find({ owner: tempUser._id })
        return new Response(JSON.stringify(todos), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ success: false }), { status: 400 })
    }
}

export async function POST(req) {
    try {
        const body = await req.json()
        console.log("Body:", body)

        const userHeader = req.headers.get("x-user")
        if (!userHeader) {
            return new Response(
                JSON.stringify({ success: false, message: "User not authenticated" }),
                { status: 401 }
            )
        }

        const user = JSON.parse(userHeader)
        console.log("User:", user)

        // Find the user in the database
        const tempUser = await User.findOne({ username: user.userName })
        if (!tempUser) {
            return new Response(JSON.stringify({ success: false, message: "User not found" }), {
                status: 404,
            })
        }

        const newTodo = new Todo({
            name: body.name,
            description: body.description,
            status: body.status || "todo",
            owner: tempUser._id,
        })

        const savedTodo = await newTodo.save()

        tempUser.todos.push(savedTodo._id)
        await tempUser.save()

        return new Response(JSON.stringify({ success: true, data: savedTodo }), { status: 201 })
    } catch (error) {
        console.error("Error:", error)
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 400,
        })
    }
}

export async function PUT(req) {
    try {
        const data = await req.json()

        const { id, updates } = data.id

        if (!id || !updates) {
            return new Response(JSON.stringify({ success: false, message: "Invalid request" }), {
                status: 400,
            })
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return new Response(JSON.stringify({ success: false, message: "Invalid Todo ID" }), {
                status: 400,
            })
        }

        // Find and update the Todo item
        const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        })

        if (!updatedTodo) {
            return new Response(JSON.stringify({ success: false, message: "Todo not found" }), {
                status: 404,
            })
        }

        return new Response(JSON.stringify({ success: true, data: updatedTodo }), { status: 200 })
    } catch (error) {
        console.error("Error:", error)
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 400,
        })
    }
}

export async function DELETE(req) {
    try {
        // Parse the request body to get the Todo ID
        const { id } = await req.json()

        console.log("Todo ID:", id)
        // // Delete the Todo from the Todo model
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if (!deletedTodo) {
            return new Response(JSON.stringify({ success: false, message: "Todo not found" }), {
                status: 404,
            })
        }

        // Remove the Todo ID from all users' todos array
        await User.updateMany({ todos: deletedTodo._id }, { $pull: { todos: deletedTodo._id } })

        // Return a success response
        return new Response(JSON.stringify({ status: deletedTodo.status, id: id }), {
            status: 200,
        })
    } catch (error) {
        console.error("Error:", error)
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 400,
        })
    }
}
