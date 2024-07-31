"use client";
import React, { createContext, useState, useContext } from "react";
import themes from "./themes"
import axios from "axios";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();


export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    const [isLoading, setIsLoading] = useState(false);

    const [tasks, setTasks] = useState([]);

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");
            setTasks(res.data);

            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    // const deleteTask = async (id) => {
    //     try {
    //         const res = axios.delete(`/api/tasks/${id}`);
    //         toast.success("Task deleted successfully");
    //         allTasks();
    //     } catch (error) {
    //         console.log(error)
    //         toast.error("Something went wrong")
    //     }
    // }
    // React.useEffect(() => {
    //     allTasks();
    // }, []);

    return (
        <GlobalContext.Provider
            value={{
                theme,
                tasks,
                // deleteTask,
                // completedTasks,
                // importantTasks,
                // incompleteTasks,
                // updateTask,
                // modal,
                // openModal,
                // closeModal,
                // allTasks,
                // collapsed,
                // collapseMenu,
            }}
        >
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);