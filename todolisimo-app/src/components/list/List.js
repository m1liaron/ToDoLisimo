import { useState } from 'react';
import Item from '../item/Item'
import Clock from '../../assets/img/clock.png';
import './List.scss';

export default function List({ tasks }) {
    const [hover, setHover] = useState(false);

    return (
        <li className="container-tasks">
            {tasks.map(item => {
                return (
                    <li className='card'>
                        <h1 className='title'>{item.name}</h1>
                        <div className='flex flex-level'>
                            <img src={Clock} alt="clock" />
                            <div className="time-check"></div>
                        </div>
                        <h1 className='title plus' onClick={() => setHover(!hover)}>+</h1>
                        <input
                            className={`title ${hover ? '' : 'hide'}`}
                            type="text"
                            placeholder='Title'
                        />
                        
                        <Item key={item.id} {...item} />
                    </li>
                )
            })}
        </li>
    )
}