import { useState, useContext } from "react";
import { TaskText } from "../TaskText/TaskText";
import { TaskActions } from "../TaskActions/TaskActions";
import style from "./TodoTask.module.css";
import { TodoContext } from "../../context/MyContext";

export function TodoTask({ task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.task);
    const { updateTask, deleteTask, toggleTask } = useContext(TodoContext);

    const handleEdit = () => {
        if (isEditing) {
            updateTask(task.id, editText);
        }
        setIsEditing(!isEditing);
    };

    const handleBlurOrEnter = (e) => {
        if (e.type === "blur" || (e.key === "Enter" && editText.trim())) {
            updateTask(task.id, editText);
            setIsEditing(false);
        }
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    return (
        <div
            className={style.task}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
            <TaskText
                task={task}
                isEditing={isEditing}
                editText={editText}
                setEditText={setEditText}
                onBlurOrEnter={handleBlurOrEnter}
                onDoubleClick={handleDoubleClick}
            />
            <TaskActions
                isEditing={isEditing}
                onEdit={handleEdit}
                onDelete={() => deleteTask(task.id)}
            />
        </div>
    );
}
