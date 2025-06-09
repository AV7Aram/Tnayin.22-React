export const initialState = {
    tasks: [],
    filter: 'all',
    currentTask: '',
};

export const actions = {
    setCurrentTask: 'setCurrentTask',
    addTask: 'addTask',
    deleteTask: 'deleteTask',
    updateTask: 'updateTask',
    toggleTask: 'toggleTask',
    setFilter: 'setFilter',
};

export function todoReducer(state, action) {
    switch (action.type) {
        case actions.setCurrentTask:
            return {
                ...state,
                currentTask: action.payload,
            };
        case actions.addTask:
            if (!state.currentTask.trim()) return state;
            return {
                ...state,
                tasks: [{
                    id: Date.now(),
                    task: state.currentTask.trim(),
                    completed: false,
                }, ...state.tasks],
                currentTask: '',
            };

        case actions.deleteTask:
            return {
                ...state,
                tasks: state.tasks.filter(t => t.id !== action.payload),
            };

        case actions.updateTask:
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload.id
                        ? { ...t, task: action.payload.newText.trim() }
                        : t
                ),
            };

        case actions.toggleTask:
            return {
                ...state,
                tasks: state.tasks.map(t =>
                    t.id === action.payload
                        ? { ...t, completed: !t.completed }
                        : t
                ),
            };

        case actions.setFilter:
            return {
                ...state,
                filter: action.payload,
            };

        default:
            return state;
    }
}