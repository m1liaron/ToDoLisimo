import { useState, useEffect } from 'react';
import List from '../list/List'
import { v4 as uuidv4 } from 'uuid';
import './Tasks.scss'

const Tasks = () => {
    const [tasks, setTasks] = useState(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return [];
        } else {
            return JSON.parse(storedTodos);
        }
    });
    const [title, setTitle] = useState('');
    const [tasksTitle, setTasksTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        if (e.key === 'Enter' && e.target.value !== '') {
            setTasks([
                ...storedTodos,
                {
                    id: uuidv4(),
                    name: title,
                    title: tasksTitle,
                    status: false,
                    time: 0
                },
            ]);
            setTasksTitle('');
            setTitle('');
        }
    };

    return (
        <div className="container">
            <div className="input-field">
                <input
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    onKeyDown={addTask}/>
                <input
                    type="text"
                    placeholder='Name of task'
                    value={tasksTitle}
                    onChange={(event) => setTasksTitle(event.target.value)}
                    onKeyDown={addTask}
                />
            </div>

                <ul className='list-of-cardsTasks'>
                    <List tasks={tasks}/>
                </ul>
        </div>
    );
}

export default Tasks;