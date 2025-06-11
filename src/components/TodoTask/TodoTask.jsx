import { useState, useContext } from "react";
import { TaskText } from "../TaskText/TaskText";
import { TaskActions } from "../TaskActions/TaskActions";
import { TodoContext } from "../../context/MyContext";

import style from "./TodoTask.module.css";
export function TodoTask({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.task);
    const [isProcessing, setIsProcessing] = useState(false);
    const { updateTask, deleteTask, toggleTask } = useContext(TodoContext);

    const handleEdit = async () => {
        if (isEditing) {
            setIsProcessing(true);
            try {
                await updateTask(task.id, editText);
                setIsEditing(false);
            } catch (error) {
            } finally {
                setIsProcessing(false);
            }
        } else {
            setIsEditing(true);
        }
    };

    const handleBlurOrEnter = async (e) => {
        if (e.type === "blur" || (e.key === "Enter" && editText.trim())) {
            setIsProcessing(true);
            try {
                await updateTask(task.id, editText);
                setIsEditing(false);
            } catch (error) {
            } finally {
                setIsProcessing(false);
            }
        }
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            await deleteTask(task.id);
        } catch (error) {
        } finally {
            setIsProcessing(false);
        }
    };

    const handleToggle = async () => {
        setIsProcessing(true);
        try {
            await toggleTask(task.id);
        } catch (error) {
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div
            className={`${style.task} ${isProcessing ? style.processing : ''}`}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggle}
                disabled={isProcessing}
            />

            <TaskText
                task={task}
                isEditing={isEditing}
                editText={editText}
                setEditText={setEditText}
                onBlurOrEnter={handleBlurOrEnter}
                onDoubleClick={handleDoubleClick}
                disabled={isProcessing}
            />

            <TaskActions
                isEditing={isEditing}
                onEdit={handleEdit}
                onDelete={handleDelete}
                disabled={isProcessing}
            />

        </div>
    );
}