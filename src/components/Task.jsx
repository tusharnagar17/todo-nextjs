"use client"
import React from "react"
import { useDispatch } from "react-redux"
import { deleteTodo, fetchTodo } from "@/store/thunk"
import { CiClock1 } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { Draggable } from "@hello-pangea/dnd"
import { tempDeleteTodo } from "@/store/slices/todoSlice"

const Task = ({ index, item, setTempData, changeUpdateModal }) => {
    const dispatch = useDispatch()

    const convertDate = (timeStamp) => {
        const date = new Date(timeStamp)

        const options = { month: "short", day: "numeric" }
        const formattedDate = date.toLocaleDateString("en-US", options)
        return formattedDate
    }

    return (
        <Draggable draggableId={item._id} index={index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="px-4 py-2 m-2 rounded-xl bg-white shadow-lg"
                >
                    <div className="text-base font-semibold my-2">{item.name}</div>
                    <div className="text-sm my-2">{item.description}</div>
                    <div
                        className={`border-2 h-2 py-1 rounded-full w-1/4 ${
                            item.status === "done" && "bg-green-500"
                        } ${item.status === "doing" && "bg-yellow-500"} ${
                            item.status === "todo" && "bg-orange-500"
                        }`}
                    ></div>
                    <div className="flex my-1 text-sm justify-between items-center">
                        <div className="flex text-gray-500 font-semibold items-center gap-1">
                            {" "}
                            <CiClock1 size={20} />
                            {convertDate(item.date)}
                        </div>
                        <div className="flex justify-center gap-2">
                            {/* Update Button */}
                            <div
                                onClick={() => {
                                    setTempData(item)
                                    changeUpdateModal()
                                }}
                                className="border-2 flex items-center justify-center px-2 py-2 rounded-full bg-sky-300 hover:bg-sky-400"
                            >
                                <FaEdit size={20} />
                            </div>

                            {/* Delete Button */}
                            <div
                                onClick={() => {
                                    dispatch(tempDeleteTodo({ id: item._id, status: item.status }))
                                    dispatch(
                                        deleteTodo({
                                            id: item._id,
                                            status: item.status,
                                        })
                                    )
                                }}
                                className="border-2 flex items-center justify-center px-2 py-1 rounded-full bg-red-300 hover:bg-red-400"
                            >
                                <MdDelete size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Task
