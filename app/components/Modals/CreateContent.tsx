import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import Modal from "./Modal";
import Toolbar from "./Toolbar";
import { edit, trash } from "@/app/utils/icons";
// import { DndContext, useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from "@dnd-kit/sortable";
// import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
// import DropArea from "../DropArea";


interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    status: "todo" | "in-progress" | "under-review" | "finished";
    priority: "Low" | "Medium" | "Urgent";
    createdAt: string;
}

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    onCreateTask: () => void;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
    props?: any;
    // setActiveCard?: any;
    // onDrop?: any
}

interface TaskCardProps {
    task: Task;
    onDelete: (taskId: string) => void;
    onEdit: (task: Task) => void;
    // setActiveCard?: any;

}

function CreateContent() {
    const [tasks, setTasks] = useState<Task[]>([]);
    // const [activeCard, setActiveCard] = useState(null)
    const { theme, closeModal } = useGlobalState();
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTask, setDeletingTask] = useState<Task | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get<Task[]>("/api/tasks");
                if (Array.isArray(res.data)) {
                    setTasks(res.data);
                } else {
                    throw new Error("Tasks fetched are not an array");
                }
            } catch (error) {
                toast.error("Error fetching tasks.");
            }
        };
        fetchTasks();
    }, [tasks]);

    const handleSubmit = async (task: Task) => {
        try {
            if (editingTask) {
                const res = await axios.put(`/api/tasks`, { taskId: editingTask._id, data: task });

                if (res.data.error) {
                    toast.error(res.data.error);
                } else {
                    toast.success("Task updated successfully.");
                    setTasks((prevTasks) =>
                        prevTasks.map((t) => (t._id === editingTask._id ? res.data.data : t))
                    );
                    // setEditingTask(null);
                }
            } else {
                const res = await axios.post("/api/tasks", task);

                if (res.data.error) {
                    toast.error(res.data.error);
                } else {
                    toast.success("Task created successfully.");
                    setTasks([...tasks, res.data]);
                }
            }

            setShowModal(false);
            closeModal();
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };


    const handleDelete = async (taskId: string) => {
        try {
            const res = await axios.delete(`/api/tasks/${taskId}`);
            console.log(res);

            toast.success("Task deleted successfully.");
            const newTasks = tasks.filter((task) => task._id !== taskId);
            setTasks(newTasks);
            console.log(tasks)
        } catch (error) {
            toast.error("Error deleting task.");
        }
    };



    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowModal(true);
    };

    // const onDrop = (status, position) => {
    //     console.log(`${activeCard} ${status} ${position}`);
    //     if (activeCard == null || activeCard === undefined) return;
    //     const taskToMove = tasks[activeCard];

    // }

    // const onDragEnd = React.useCallback((result: DropResult) => {
    //     console.log(result);
    // }, [])

    return (
        <CreateContentStyled theme={theme}>
            <Toolbar />
            {/* <DragDropContext
                onDragEnd={onDragEnd}
            >
                <Droppable
                    droppableId="dashboard"
                    type="COLUMN"
                    direction="horizontal"

                ></Droppable> */}
            <div className="tasks">
                <TaskColumn
                    title="To do"
                    tasks={tasks.filter((task) => task.status === "todo")}
                    onCreateTask={() => setShowModal(true)}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                // setActiveCard={setActiveCard}
                // onDrop={onDrop}
                />
                <TaskColumn
                    title="In progress"
                    tasks={tasks.filter((task) => task.status === "in-progress")}
                    onCreateTask={() => setShowModal(true)}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                // setActiveCard={setActiveCard}
                // onDrop={onDrop}

                />
                <TaskColumn
                    title="Under review"
                    tasks={tasks.filter((task) => task.status === "under-review")}
                    onCreateTask={() => setShowModal(true)}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                // setActiveCard={setActiveCard}
                // onDrop={onDrop}

                />
                <TaskColumn
                    title="Finished"
                    tasks={tasks.filter((task) => task.status === "finished")}
                    onCreateTask={() => setShowModal(true)}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                // setActiveCard={setActiveCard}
                // onDrop={onDrop}

                />
            </div>
            {/* <h1>Active Card -{activeCard}</h1> */}
            {/* </DragDropContext> */}
            {showModal ? <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmit} /> : ""}
        </CreateContentStyled>
    );
}

function TaskColumn({ title, tasks, onCreateTask, onDelete, onEdit, setActiveCard, props }: TaskColumnProps) {
    // const tasksId = useMemo(() => tasks.map((task) => task.id),[tasks]);
    // const { task, deleteTask } = props;
    // const { setNodeRef, attributes, listeners, transform, transition } =
    //     useSortable({
    //         id: task.id,
    //         data: {
    //             type: "Column",
    //             task,
    //         },
    //     });

    // const style = {
    //     transition,
    //     transform: CSS.Transform.toString(transform),
    // }
    return (
        <div
            // ref={setNodeRef}
            // style={style}
            className="task-column">
            <div className="heading">
                <h2>{title}</h2>
                <img className="status-img" src="/status.png" alt="" />
            </div>
            <div
                // {...attributes}
                // {...listeners}
                className="task-cards">
                {/* <SortableContext items={tasksId}> */}
                {tasks.map((task) => (
                    <React.Fragment key={task.id}>
                        <TaskCard

                            task={task}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        // setActiveCard={setActiveCard}
                        />
                    </React.Fragment>
                ))}
                {/* <DropArea onDrop={() => ondrop(status, index + 1)} /> */}

                {/* </SortableContext> */}
            </div>
            <button
                className="create-button w-full text-sm font-light text-white bg-slate-900 hover:bg-slate-950 rounded-xl"
                onClick={onCreateTask}
            >
                <div className="h-12 add"><h3>Add new (+)</h3></div>
            </button>
        </div>
    );
}

function TaskCard({ task, onDelete, onEdit, setActiveCard }: TaskCardProps) {
    // console.log(task);
    return (
        <article className={`bg-gray-200 rounded-md p-5 task-style ${task.priority.toLowerCase()}`} draggable onDragStart={() => setActiveCard(task.id)} onDragEnd={() => setActiveCard(null)}>
            <h3 className="text-l font-semi-bold mb-2">{task.title}</h3>
            <p className="mb-2">{task.description}</p>
            <span className={`mb-2 inline-block rounded-lg px-3 py-1 text-sm font-semibold ${priorityClass(task.priority)}`}>
                {task.priority}
            </span><br />
            <div className="time">
                <img className="clock-img mr-2 mt-1" src="/clock.png" alt="" />
                <span className="mb-2 mt-1">{task.date}</span>
            </div>
            <div className="created-at mt-2 text-gray-600">
                Created at: {new Date(task.createdAt).toLocaleString()}
            </div>
            <div className="button-grp">
                <button className="edit" onClick={() => onEdit(task)}>{edit}</button>
                <button className="delete" onClick={() => onDelete(task._id)}>{trash}</button>
            </div>
        </article>
    );
}

const priorityClass = (priority) => {
    switch (priority) {
        case 'Urgent':
            return 'bg-red-500 text-white';
        case 'Medium':
            return 'bg-yellow-500 text-white';
        case 'Low':
            return 'bg-green-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

const CreateContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f4f5f7;

    .time{
        display: flex;
    }

    .tasks {
        display: flex;
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        flex-direction: row;
    }

    .task-column::-webkit-scrollbar {
        display: none;
    }

    .task-style{
        width: 100%;
    }

    .task-style h3 {
        color: ${(props) => props.theme.colorGrey4};
    }

    .button-grp{
        display: flex;
        justify-content: center;
    }

    .edit {
        padding-top: 20px;
        margin-left: 150px;
        margin-right: 10px;
        color: #1274d5;
  }

    .delete {
        color: #ae0000;
        padding-top: 20px;
        margin-right: 10px;
    }

    .heading h2{
        color: ${(props) => props.theme.colorGrey5};
        font-size: larger;
    }

    .task-style p {
        color: ${(props) => props.theme.colorGrey3};
    }

    .add{
        display:flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 20px;
        text-align: center;
  }

            .task-column {
                flex: 1;
            padding: 20px;
            margin-right: 10px;
            border-radius: 8px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
  }

            .heading{
                display: flex;
            justify-content: space-between;
            align-items: center;
  }
            .task-cards {
                display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
  }

            .task-card {
                background: #fff;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            width: calc(50% - 10px); 
  }

            .create-button {
                margin-top:20px;
  }

            .status-img{
                width: 20px;
            height: 20px;
  }

            .clock-img{
                width: 20px;
            height: 20px;
  }
`;

export default CreateContent;
