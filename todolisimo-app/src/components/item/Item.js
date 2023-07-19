import React, { useEffect, useState } from 'react';
import StopWatch from '../stopWatch/StopWatch';
import './Item.scss';

export default function Item({ title, id, status, time, setLevel, goal, setCurrentTime, setLostTime}) {
  const [name, setName] = useState(title);
  const [checked, setChecked] = useState(status);
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const classes = ['todo'];

  if (checked) {
    classes.push('status');
  }

  const updateStatus = (e) => {
    setChecked(e.target.checked);
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    storedTodos.forEach((el) => {
      if (el.id === id) {
        el.status = e.target.checked;
        el.time = 0;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(storedTodos));
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    storedTodos.forEach((el) => {
      if (el.id === id) {
        el.title = newName;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(storedTodos));
  };

  const removeElement = () => {
    setVisible(false);
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    localStorage.removeItem(`tasks_${id}`);
    let removeTodos = storedTodos.filter((item) => item.id !== id);
    localStorage.setItem('tasks', JSON.stringify(removeTodos));
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('tasks')),
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

    setLevel(time / 10);
    setCurrentTime(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    setLostTime(lostTime.toFixed());
  },);

  return (
    <>
      {visible && (
          <li className={classes.join(' ')}>
            <label>
              <div>
                <input type="checkbox" checked={checked} onChange={updateStatus} />
                <span>{name}</span>
              </div>
              <div className='flex'>
                <StopWatch id={id} initialTime={time} isHovered={isHovered} />
                <i className='fa-solid fa-pen fa-xl' onClick={() => setIsHovered(!isHovered)}></i>
                <i
                  className={`material-icons red-text ${isHovered ? 'hoverCross' : 'hide'}`}
                  onClick={removeElement}
                >
                  X
                </i>
              </div>
            </label>
            {isHovered && (
              <input type='text' value={name} onChange={handleNameChange} />
            )}
          </li>
      )}
    </>
  );
}