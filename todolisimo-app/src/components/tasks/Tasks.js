import { useState, useEffect } from 'react';
import List from '../list/List'
import { v4 as uuidv4 } from 'uuid';
import './Tasks.scss'

const Tasks = () => {
    const [cards, setCards] = useState(() => {
        const storedTodos = localStorage.getItem('cards');
        if (!storedTodos) {
            return [];
        } else {
            return JSON.parse(storedTodos);
        }
    });
    const [title, setTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);

    const addTask = (e) => {
        const storedTodos = JSON.parse(localStorage.getItem('cards'));
        if (e.key === 'Enter' && e.target.value !== '') {
            setCards([
                ...storedTodos,
                {
                    id: uuidv4(),
                    name: title,
                },
            ]);
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
            </div>

                <ul className='list-of-cardsTasks'>
                    <List cards={cards} />
                </ul>
        </div>
    );
}

export default Tasks;