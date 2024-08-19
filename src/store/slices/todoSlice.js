import { createSlice } from "@reduxjs/toolkit"
import { fetchTodo, addTodo, editTodo, deleteTodo } from "../thunk"
import { act } from "react"
// thunks here

const initialState = {
    todo: [],
    doing: [],
    done: [],
    loading: false,
    error: null,
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        moveTodo: (state, action) => {
            const { task, sourceStatus, destinationStatus } = action.payload

            // Find the task in the source status array
            const taskToMove = state[sourceStatus].find((t) => t._id === task._id)

            if (taskToMove) {
                // Remove the task from the source status array
                state[sourceStatus] = state[sourceStatus].filter((t) => t._id !== task._id)

                // Update the task's status
                taskToMove.status = destinationStatus

                // Add the task to the destination status array
                state[destinationStatus].push(taskToMove)
            }
        },
        tempChangeTodo: (state, action) => {
            const updatedTodo = action.payload

            const newTodo = state[updatedTodo.updates.status].find((t) => t._id === updatedTodo.id)

            if (newTodo) {
                newTodo.status = updatedTodo.updates.status
                newTodo.description = updatedTodo.updates.description
                newTodo.name = updatedTodo.updates.name
            }
        },
        tempDeleteTodo: (state, action) => {
            const { id, status } = action.payload

            state[status] = state[status].filter((t) => t._id !== id)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.loading = false

                state.todo = action.payload.filter((item) => item.status === "todo")
                state.doing = action.payload.filter((item) => item.status === "doing")
                state.done = action.payload.filter((item) => item.status === "done")
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state[action.payload.status].push(action.payload)
            })
            .addCase(editTodo.fulfilled, (state, action) => {
                // const taskIndex = state[action.payload.status].findIndex(item => item.id ===action.pay)
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const { status } = action.payload

                const index = state[status].findIndex((task) => task._id === action.payload._id)
                if (index >= 0) {
                    state[status][index] = action.payload
                }
            })
    },
})

export const { moveTodo, tempChangeTodo, tempDeleteTodo } = todoSlice.actions
export default todoSlice.reducer
