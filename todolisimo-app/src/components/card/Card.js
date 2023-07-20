import { useState, useEffect, useRef } from 'react';
import Item from '../item/Item'
import Clock from '../../assets/img/clock.png';
import { v4 as uuidv4 } from 'uuid';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import './Card.scss';

const Card = ({ id, name}) => {
    const [tasks, setTasks] = useState(() => {
    const storedTodos = localStorage.getItem(`tasks_${id}`);
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

    useEffect(() => {
        localStorage.setItem(`tasks_${id}`, JSON.stringify(tasks));

        localStorage.setItem(`goal_${id}`, goal.toString());
    }, [tasks, goal, id]);

    const addTask = (e) => {
        const storedTodos = JSON.parse(localStorage.getItem(`tasks_${id}`));
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
        localStorage.removeItem(`goal_${id}`);
    };

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(`tasks_${id}`)),
        totalTime = storedTodos.reduce((acc, el) => acc + el.time, 0),
        time = Math.floor(totalTime / 100),

        hours = Math.floor(time / 3600),
        minutes = Math.floor((time % 3600) / 60),
        seconds = time % 60,

        formattedHours = hours.toString().padStart(2, '0'),
        formattedMinutes = minutes.toString().padStart(2, '0'),
        formattedSeconds = seconds.toString().padStart(2, '0'),

        timeInHours = hours + minutes / 60 + seconds / 3600,
        lostTime = goal - timeInHours;

        setPerLevel(time / 10);
        setCurrentTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
        setLostTime(lostTime.toFixed());
    });
    
    return (
        <TransitionGroup component={null}>
            {visible && (
                    <CSSTransition in={visible} timeout={300} classNames="card">
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
                        <p className='title' style={{fontSize : '30px'}}>Ціль:{goal} годин</p>
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
                            <Item key={item.id} {...item} />
                        </li>
                    )
                })}
                </li>
                    </CSSTransition>
            )}
        </TransitionGroup>
    )
}

export default Card;