import { useContext } from 'react';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodoContext } from '../../context/MyContext';

import style from './TodoForm.module.css';

export function TodoForm() {
    const { state, setCurrentTask, addTask } = useContext(TodoContext);

    return (
        <div className={style.newTask}>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Task to be done..."
                    value={state.currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                />
                <TodoFilter />
                <button>Add</button>
            </form>
        </div>
    );
}