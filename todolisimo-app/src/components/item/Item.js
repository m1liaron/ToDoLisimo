import React, { useState, useEffect } from 'react';
import StopWatch from '../stopWatch/StopWatch';
import './Item.scss'

export default function Item({ title, id, status, time }) {
  const [name, setName] = useState(title);
  const [checked, setChecked] = useState(status);
  const [isHovered, setIsHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const classes = ["todo"];

  if (checked) {
    classes.push("status");
  }

  const updateStatus = () => {
    setChecked(!checked);
    setIsHovered(!isHovered);
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    storedTodos.forEach((el) => {
      if (el.id === id) {
        el.status = !checked;
        el.time = 0;
      }
      return true;
    });
    localStorage.setItem("tasks", JSON.stringify(storedTodos));
  };

  const removeElement = () => {
    setVisible((prev) => !prev);
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));

    let removeTodos = storedTodos.filter((item) => {
      if (item.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem("tasks", JSON.stringify(removeTodos));
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);

    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    storedTodos.forEach((el) => {
      if (el.id === id) {
        el.title = newName;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(storedTodos));
  };

  return (
    <>
      {visible && (
        <div>
          <li className={classes.join(" ")}>
            <label>
              <div>
                <input type="checkbox" checked={checked} onChange={updateStatus} />
                <span>{title}</span>
              </div>
              <div className='flex'>
                 <StopWatch id={id} initialTime={time} />
            <i
            className={`material-icons red-text ${isHovered ? 'visible' : 'hide'}`}
            onClick={removeElement}
            >
            X
          </i>
             </div>
            </label>
          </li>
        </div>
      )}
    </>
  );
}
