export const initialState = {
    tasks: [],
    filter: 'all',
    currentTask: '',
    isLoading: false,
    error: null,
};

export const ACTIONS = {
    SET_CURRENT_TASK: 'SET_CURRENT_TASK',
    SET_FILTER: 'SET_FILTER',

    FETCH_TASKS_START: 'FETCH_TASKS_START',
    FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_ERROR: 'FETCH_TASKS_ERROR',

    CREATE_TASK_START: 'CREATE_TASK_START',
    CREATE_TASK_SUCCESS: 'CREATE_TASK_SUCCESS',
    CREATE_TASK_ERROR: 'CREATE_TASK_ERROR',

    UPDATE_TASK_START: 'UPDATE_TASK_START',
    UPDATE_TASK_SUCCESS: 'UPDATE_TASK_SUCCESS',
    UPDATE_TASK_ERROR: 'UPDATE_TASK_ERROR',

    DELETE_TASK_START: 'DELETE_TASK_START',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    DELETE_TASK_ERROR: 'DELETE_TASK_ERROR',
};

export function todoReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_CURRENT_TASK:
            return {
                ...state,
                currentTask: action.payload,
            };

        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filter: action.payload,
            };

        case ACTIONS.FETCH_TASKS_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case ACTIONS.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: action.payload,
            };

        case ACTIONS.FETCH_TASKS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };


        case ACTIONS.CREATE_TASK_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case ACTIONS.CREATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: [action.payload, ...state.tasks],
                currentTask: '',
            };

        case ACTIONS.CREATE_TASK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case ACTIONS.UPDATE_TASK_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case ACTIONS.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };

        case ACTIONS.UPDATE_TASK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        case ACTIONS.DELETE_TASK_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case ACTIONS.DELETE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };

        case ACTIONS.DELETE_TASK_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}