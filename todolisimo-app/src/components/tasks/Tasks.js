import { useState, useEffect } from 'react';
import List from '../list';
import { v4 as uuidv4 } from 'uuid';
import Clock from '../../assets/img/clock.png';
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
    const [tasksTitle, setTasksTitle] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const data = new Date();
            const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const month = monthName[data.getMonth()];
            const day = data.getDate();
            const year = data.getFullYear();
            const hour = data.getHours();
            const minutes = data.getMinutes();
            setCurrentTime(`${month} ${day}, ${year}, ${hour}:${minutes < 10 ? '0' + minutes : minutes}`);
        },[]);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const addTask = (e) => {
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        if (e.key === 'Enter' && e.target.value !== '') {
            setTasks([
                ...storedTodos,
                {
                    id: uuidv4(),
                    title: tasksTitle,
                    status: false,
                    time: 0
                },
            ]);
            setTasksTitle('');
        }
    };

    return (
        <div className="container">
            <div className="title">
                <h1>Note your tasks😁</h1>
                <div className="time">
                    <span>{currentTime}</span>
                </div>
            </div>
            <div className="input-field">
                <input
                    type="text"
                    value={tasksTitle}
                    onChange={(event) => setTasksTitle(event.target.value)}
                    onKeyDown={addTask}
                />
            </div>
            
            <div className='flex flex-level'>
                <img src={Clock} alt="clock" />
                <div className="time-check"></div>
            </div>
            <div className="container-tasks">
                <List tasks={tasks}/>
            </div>
        </div>
    );
}

export default Tasks;