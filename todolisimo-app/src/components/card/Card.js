import { useState, useEffect } from 'react';
import Item from '../item/Item'
import Clock from '../../assets/img/clock.png';
import { v4 as uuidv4 } from 'uuid';
import './Card.scss';

const Card = ({ id, name }) => {
        const [tasks, setTasks] = useState(() => {
        const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return [];
        } else {
            return JSON.parse(storedTodos);
        }
    });
    const [tasksTitle, setTasksTitle] = useState('');
    const [visible, setVisible] = useState(true);
    const [hover, setHover] = useState(false);

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
                    title: tasksTitle,
                    status: false,
                    time: 0
                },
            ]);
            setTasksTitle('');
        }
    };

    const removeCard = (id) => {
        setVisible(false);
        const storedTodos = JSON.parse(localStorage.getItem('cards'));

        let removeTodos = storedTodos.filter((card) => card.id !== id);
        localStorage.setItem('cards', JSON.stringify(removeTodos));
    };

    return (
        <>
        {visible && (
            <li className='card'>
                    <i
                        className='material-icons red-text'
                        onClick={() => removeCard(id)}
                    >
                    X
                    </i>
                        <h1 className='title'>{name}</h1>
                        <div className='flex flex-level'>
                            <img src={Clock} alt="clock" />
                            <div className="time-check"></div>
                        </div>
                        <input
                            className='title'
                            type="text"
                            placeholder='Title'
                            value={tasksTitle}
                            onChange={(event) => setTasksTitle(event.target.value)}
                            onKeyDown={addTask}
                        />
                {tasks.map(item => {
                return (
                    <li>
                        <Item key={item.id} {...item} />
                    </li>
                )
            })}
            </li>
        )}
        </>
    )
}

export default Card;