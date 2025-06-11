import { useReducer, useEffect } from "react";
import { TodoContext } from "./MyContext";
import { todoReducer, initialState, ACTIONS } from "../store/store";
import { todoAPI } from "../api/api";

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch({ type: ACTIONS.FETCH_TASKS_START });
            try {
                const tasks = await todoAPI.getTasks(10);
                dispatch({ type: ACTIONS.FETCH_TASKS_SUCCESS, payload: tasks });
            } catch (error) {
                dispatch({
                    type: ACTIONS.FETCH_TASKS_ERROR,
                    payload: "Error loading tasks"
                });
            }
        };

        fetchTasks();
    }, []);

    const setCurrentTask = (text) => {
        dispatch({ type: ACTIONS.SET_CURRENT_TASK, payload: text });
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!state.currentTask.trim()) return;

        dispatch({ type: ACTIONS.CREATE_TASK_START });
        try {
            const newTask = await todoAPI.createTask(state.currentTask);
            dispatch({ type: ACTIONS.CREATE_TASK_SUCCESS, payload: newTask });
        } catch (error) {
            dispatch({
                type: ACTIONS.CREATE_TASK_ERROR,
                payload: "Error creating task"
            });
        }
    };

    const deleteTask = async (id) => {
        dispatch({ type: ACTIONS.DELETE_TASK_START });
        try {
            await todoAPI.deleteTask(id);
            dispatch({ type: ACTIONS.DELETE_TASK_SUCCESS, payload: id });
        } catch (error) {
            dispatch({
                type: ACTIONS.DELETE_TASK_ERROR,
                payload: "Error deleting task"
            });
        }
    };

    const updateTask = async (id, newText) => {
        dispatch({ type: ACTIONS.UPDATE_TASK_START });
        try {
            const updatedTask = await todoAPI.updateTask(id, { title: newText });
            dispatch({
                type: ACTIONS.UPDATE_TASK_SUCCESS,
                payload: updatedTask
            });
        } catch (error) {
            dispatch({
                type: ACTIONS.UPDATE_TASK_ERROR,
                payload: "Task update error"
            });
        }
    };

    const toggleTask = async (id) => {
        const task = state.tasks.find(t => t.id === id);
        if (!task) return;

        dispatch({ type: ACTIONS.UPDATE_TASK_START });
        try {
            const updatedTask = await todoAPI.updateTask(id, {
                completed: !task.completed
            });
            dispatch({
                type: ACTIONS.UPDATE_TASK_SUCCESS,
                payload: updatedTask
            });
        } catch (error) {
            dispatch({
                type: ACTIONS.UPDATE_TASK_ERROR,
                payload: "Error updating task status"
            });
        }
    };

    const setFilter = (filter) => {
        dispatch({ type: ACTIONS.SET_FILTER, payload: filter });
    };

    const filteredTasks = state.tasks.filter(t => {
        if (state.filter === "done") return t.completed;
        if (state.filter === "notDone") return !t.completed;
        return true;
    });

    const value = {
        state,
        filteredTasks,
        setCurrentTask,
        addTask,
        deleteTask,
        updateTask,
        toggleTask,
        setFilter,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}