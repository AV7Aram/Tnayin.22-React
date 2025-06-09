import { useReducer } from "react";
import { TodoContext } from "./MyContext";
import { todoReducer, initialState, actions } from "../store/store";

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const filteredTasks = state.tasks.filter(t => {
        if (state.filter === "done") {
            return t.completed;
        }
        if (state.filter === "notDone") {
            return !t.completed;
        }
        return true;
    });

    const value = {
        state,
        dispatch,
        filteredTasks,
        setCurrentTask: (text) =>
            dispatch({ type: actions.setCurrentTask, payload: text }),
        addTask: (e) => {
            e.preventDefault();
            dispatch({ type: actions.addTask });
        },
        deleteTask: (id) =>
            dispatch({ type: actions.deleteTask, payload: id }),
        updateTask: (id, newText) =>
            dispatch({ type: actions.updateTask, payload: { id, newText } }),
        toggleTask: (id) =>
            dispatch({ type: actions.toggleTask, payload: id }),
        setFilter: (filter) =>
            dispatch({ type: actions.setFilter, payload: filter }),
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}