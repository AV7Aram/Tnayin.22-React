import style from './TodoContainer.module.css';
import { TodoForm } from "../TodoForm/TodoForm";
import { TodoList } from "../TodoList/TodoList";

export function TodoContainer() {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <TodoForm />
                <TodoList />
            </div>
        </div>
    );
}