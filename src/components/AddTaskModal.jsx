"use client"
import { addTodo } from "@/store/thunk"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

const AddTaskModal = ({ title, isOpen, changeModal, onClose }) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [selectedOption, setSelectedOption] = useState(title)

    const dispatch = useDispatch()
    const handleOptionChange = (ev) => {
        setSelectedOption(ev.target.value)
    }
    const handleFormSubmit = (ev) => {
        ev.preventDefault()

        dispatch(addTodo({ name: name, description: description, status: selectedOption }))
        setName("")
        setDescription("")
        changeModal()
    }
    return (
        <>
            {!isOpen ? (
                <div
                    onClick={changeModal}
                    className="cursor-pointer my-2 text-gray-700 py-2 px-4 font-semibold hover:underline"
                >
                    + Add a Task
                </div>
            ) : (
                <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-90">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-lg font-semibold">Add New Task</h2>
                        {/* Add your form or content for the modal here */}
                        <form onSubmit={handleFormSubmit} className="flex flex-col">
                            <input
                                type="text"
                                placeholder="name"
                                className="px-2 py-1 my-2 border border-gray-500 rounded-lg"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                required
                            />
                            <input
                                type="text"
                                placeholder="description"
                                className="px-2 py-1 my-2 border border-gray-500 rounded-lg"
                                value={description}
                                onChange={(ev) => setDescription(ev.target.value)}
                                required
                            />
                            <select
                                id="mySelect"
                                value={selectedOption}
                                className="px-2 py-1 my-2 border border-gray-500 rounded-lg"
                                onChange={handleOptionChange}
                            >
                                <option key="todo" value="todo">
                                    Todo
                                </option>
                                <option key="doing" value="doing">
                                    Doing
                                </option>
                                <option key="done" value="done">
                                    Done
                                </option>
                            </select>

                            <button
                                type="submit"
                                className="bg-sky-300 text-center hover:bg-sky-400 mt-2  text-white px-4 py-2 rounded"
                            >
                                Add Task
                            </button>
                        </form>
                        <button
                            onClick={onClose}
                            className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddTaskModal
