"use client"
import React, { useEffect } from "react"
// import { DragDropContext } from "react-beautiful-dnd"
import Column from "./Column"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteTodo, editTodo, fetchTodo } from "@/store/thunk"
import { moveTodo } from "@/store/slices/todoSlice"
import { DragDropContext } from "@hello-pangea/dnd"

const DragComponent = () => {
    const { todo, doing, done, loading, error } = useSelector((state) => state.todos)
    const data = useSelector((state) => state.todos)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodo())
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    const onDragEnd = (event) => {
        const { source, destination } = event
        const taskId = event.draggableId

        console.log("taskId", taskId)
        if (!destination) return

        // Don't move in same column
        if (source.droppableId === destination.droppableId) {
            return
        }

        // Move to other column

        const sourceStatus = source.droppableId
        const destinationStatus = destination.droppableId

        console.log("source", sourceStatus)
        console.log("destination", destinationStatus)

        dispatch(
            moveTodo({
                task: { _id: taskId, status: sourceStatus },
                sourceStatus,
                destinationStatus,
            })
        )
        const updates = { status: destinationStatus }
        dispatch(editTodo({ id: taskId, updates }))
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex items-start max-w-7xl overflow-x-auto mx-auto gap-4">
                <Column index={111} title="todo" tasks={todo} />
                <Column index={222} title="doing" tasks={doing} />
                <Column index={333} title="done" tasks={done} />
            </div>
        </DragDropContext>
    )
}

export default DragComponent
