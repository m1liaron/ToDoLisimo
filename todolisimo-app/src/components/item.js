import React, { useState, useEffect } from 'react';
import StopWatch from './stopWatch/StopWatch';

export default function Item({ title, id, status, time }) {
  const [checked, setChecked] = useState(status);
  const classes = ["todo"];

  if (checked) {
    classes.push("status");
  }

  const updateStatus = () => {
    setChecked(!checked);
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

  const [visible, setVisible] = useState(true);

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

  return (
    <>
      {visible && (
        <li className={classes.join(" ")}>
          <label>
            <input type="checkbox" checked={checked} onChange={updateStatus} />
            <span>{title}</span>
            <i className="material-icons red-text" onClick={removeElement}>
              X
            </i>
            <StopWatch id={id} initialTime={time} />
          </label>
        </li>
      )}
    </>
  );
}