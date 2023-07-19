import { useState, useEffect, useRef } from 'react';
import Item from '../item/Item'
import Clock from '../../assets/img/clock.png';
import { v4 as uuidv4 } from 'uuid';
import './Card.scss';

const Card = ({ id, name, setCards }) => {
    const [tasks, setTasks] = useState(() => {
    const storedTodos = localStorage.getItem('tasks');
        if (!storedTodos) {
            return [];
        } else {
            return JSON.parse(storedTodos);
            }
        });
    const [perLevel, setPerLevel] = useState(0);
    const [goal, setGoal] = useState(() => {
        const storedGoal = localStorage.getItem(`goal_${id}`);
        return storedGoal ? parseInt(storedGoal) : 0;
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [lostTime, setLostTime] = useState(0);
    const [tasksTitle, setTasksTitle] = useState('');
    const [visible, setVisible] = useState(true);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));

        localStorage.setItem(`goal_${id}`, goal.toString());
    }, [tasks, goal, id]);

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

    const addGoal = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            localStorage.setItem(`goal_${id}`, goal.toString());
        }
    }

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
                    className='material-icons red-text cross'
                    onClick={() => removeCard(id)}
                    >
                    X
                    </i>
                    <p className='title' style={{marginBottom: '10px'}}>{name}</p>

                    <div className='flex flex-level'>
                        <img src={Clock} alt="clock" />
                        <div className="time-check">
                            <p className='time-current name'>{currentTime}</p>
                            <p className='time-last name'>{lostTime}</p>
                            <div className="time-check_after" style={{width : `${perLevel}%`}}></div>
                        </div>
                    </div>
                    <input
                        className='title'
                        type="number"
                        min={1}
                        max={1000}
                        placeholder='Змінити ціль'
                        value={goal}
                        onChange={(event) => setGoal(event.target.value)}
                        onKeyDown={addGoal}
                        />
                    <p className='title'>Ціль:{goal} годин</p>
                        <input
                            className='title'
                            type="text"
                            placeholder='Назва завдання'
                            value={tasksTitle}
                            onChange={(event) => setTasksTitle(event.target.value)}
                            onKeyDown={addTask}
                        />
                {tasks.map(item => {
                return (
                    <li>
                        <Item key={item.id} {...item} setLevel={setPerLevel} goal={goal} setCurrentTime={setCurrentTime} setLostTime={setLostTime} />
                    </li>
                )
            })}
            </li>
        )}
        </>
    )
}

export default Card;