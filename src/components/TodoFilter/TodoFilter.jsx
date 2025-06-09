import { useContext } from 'react';
import { TodoContext } from '../../context/MyContext';

export function TodoFilter() {
    const { setFilter } = useContext(TodoContext);

    return (
        <>
            <button onClick={() => setFilter("notDone")}>IsDone</button>
            <button onClick={() => setFilter("done")}>Done</button>
            <button onClick={() => setFilter("all")}>All</button>
        </>
    )
}