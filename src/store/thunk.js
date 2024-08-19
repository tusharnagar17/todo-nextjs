import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTodo = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch("/api/todo", { method: "GET" })
    const data = await response.json()
    // console.log("data in thunk", data)
    return data
})

export const addTodo = createAsyncThunk("todos/addTodo", async (newTask) => {
    const response = await fetch("/api/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
    })
    if (!response.ok) {
        throw new Error("Network Response was not ok")
    }
    const data = await response.json()
    return data.data
})

export const editTodo = createAsyncThunk("todos/editTodo", async (id, updates) => {
    const response = await fetch("/api/todo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, updates }),
    })
    if (!response.ok) {
        throw new Error("Network Response was not ok")
    }
    const data = await response.json()
    return data.data
})

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async ({ id, status }) => {
    const response = await fetch("/api/todo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
    })
    if (!response.ok) {
        throw new Error("Network response was not Ok")
    }
    const data = await response.json()

    return { id, status }
})
