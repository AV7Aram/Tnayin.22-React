import { createContext } from "react";

export const TodoContext = createContext({
    state: null,
    dispatch: () => { },
    filteredTasks: [],
});