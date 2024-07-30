import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { useGlobalState } from "@/app/context/globalProvider";
import Modal from "./Modal";
import Toolbar from "./Toolbar";

interface Task {
    id: string;
    title: string;
    description: string;
    date: string;
    status: "todo" | "in-progress" | "under-review" | "finished";
    priority: "Low" | "Medium" | "High" | "Urgent";
}

interface TaskColumnProps {
    title: string;
    tasks: Task[];
    onCreateTask: () => void;
}

interface TaskCardProps {
    task: Task;
}

function CreateContent() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const { theme, closeModal } = useGlobalState();
    const [showModal, setShowModal] = useState(false);

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
    }, []);

    const handleSubmit = async (task: Task) => {
        try {
            const res = await axios.post("/api/tasks", task);

            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Task created successfully.");
                setTasks([...tasks, res.data]);
                setShowModal(false);
                closeModal();
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <CreateContentStyled theme={theme}>
            <Toolbar />
            <div className="tasks">
                <TaskColumn
                    title="To do"
                    tasks={tasks.filter((task) => task.status === "todo")}
                    onCreateTask={() => setShowModal(true)}
                />
                {/* <img className="status-img" src="/status.png" alt="" /> */}
                <TaskColumn
                    title="In progress"
                    tasks={tasks.filter((task) => task.status === "in-progress")}
                    onCreateTask={() => setShowModal(true)}
                />
                {/* <img className="status-img" src="/status.png" alt="" /> */}
                <TaskColumn
                    title="Under review"
                    tasks={tasks.filter((task) => task.status === "under-review")}
                    onCreateTask={() => setShowModal(true)}
                />
                {/* <img className="status-img" src="/status.png" alt="" /> */}
                <TaskColumn
                    title="Finished"
                    tasks={tasks.filter((task) => task.status === "finished")}
                    onCreateTask={() => setShowModal(true)}
                />
                {/* <img className="status-img" src="/status.png" alt="" /> */}
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleSubmit} />
        </CreateContentStyled>
    );
}

function TaskColumn({ title, tasks, onCreateTask }: TaskColumnProps) {
    return (
        <div className="task-column">
            <div className="heading">
                <h2>{title}</h2>
                <img className="status-img" src="/status.png" alt="" />
            </div>
            <div className="task-cards">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
            <button
                className="create-button w-full h-12 text-sm font-light text-white bg-slate-900 hover:bg-slate-950 rounded-xl"
                onClick={onCreateTask}
            >
                Add new (+)
            </button>
        </div>
    );
}

function TaskCard({ task }: TaskCardProps) {
    return (
        <div className={`task-card ${task.priority.toLowerCase()}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <span>{task.date}</span>
        </div>
    );
}

const CreateContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f5f7;

  .tasks {
    display: flex;
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    flex-direction: row;
  }

  .task-column {
    flex: 1;
    padding: 20px;
    background: #eaeaea;
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
    flex-wrap: wrap;
    gap: 10px;
  }

  .task-card {
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: calc(50% - 10px); 
  }


  .create-button {
    margin-top: 20px;
  }

  .status-img{
    width: 20px;
    height: 20px;
  }
`;

export default CreateContent;
