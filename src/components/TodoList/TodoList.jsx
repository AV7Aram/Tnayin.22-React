import { useContext } from 'react';
import { TodoTask } from '../TodoTask/TodoTask';
import style from './TodoList.module.css';
import { TodoContext } from '../../context/MyContext';

export function TodoList() {
    const { filteredTasks } = useContext(TodoContext);

    return (
        <div className={style.tasks}>
            {filteredTasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}