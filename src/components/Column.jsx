import React, { useState } from "react"
import AddTaskModal from "./AddTaskModal"

import { useDispatch } from "react-redux"
import UpdateTodoModal from "./UpdateTodoModal"
import Task from "./Task"
import { Droppable } from "@hello-pangea/dnd"

const Column = ({ index, title, tasks }) => {
    // create taskmodal
    const [isModalOpen, setIsModalOpen] = useState(false)

    const changeModal = () => setIsModalOpen((prev) => !prev)
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    // Update task modal
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [tempData, setTempData] = useState(null)

    const changeUpdateModal = () => setUpdateModalOpen((prev) => !prev)
    const openUpdateModal = () => setUpdateModalOpen(true)
    const closeUpdateModal = () => setUpdateModalOpen(false)

    const dispatch = useDispatch()

    return (
        <Droppable droppableId={title}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="md:w-1/3 w-1/2 border-2 px-2 rounded-xl my-4 bg-gray-100"
                >
                    <div className="text-center font-bold text-xl py-4">{title}</div>
                    <div>
                        {tasks &&
                            tasks.map((item, index) => {
                                return (
                                    <Task
                                        key={index}
                                        index={index}
                                        item={item}
                                        setTempData={setTempData}
                                        changeUpdateModal={changeUpdateModal}
                                    />
                                )
                            })}{" "}
                    </div>

                    {provided.placeholder}
                    {/* Add New task Modal */}
                    <AddTaskModal
                        title={title}
                        isOpen={isModalOpen}
                        changeModal={changeModal}
                        onClose={closeModal}
                    />

                    {/* Update Task Modal */}
                    {tasks && tempData && (
                        <UpdateTodoModal
                            item={tempData}
                            changeModal={changeUpdateModal}
                            isOpen={updateModalOpen}
                            onClose={closeUpdateModal}
                        />
                    )}
                </div>
            )}
        </Droppable>
    )
}

export default Column
