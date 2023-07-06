import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Item({ title, id, status }) {
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
            <input
              type="checkbox"
              checked={checked}
              onChange={updateStatus}
            />
            <span>{title}</span>
            <i
              className="material-icons red-text"
              onClick={removeElement}
            >
              X
            </i>
            <Stopwatch id={uuidv4}/>
          </label>
        </li>
      )}
    </>
  );
}

export function Stopwatch({ id }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [btn, setBtn] = useState("Start");

  useEffect(() => {
    const storedTime = localStorage.getItem(`stopwatchTime_${id}`);
    if (storedTime) {
      setTime(parseInt(storedTime));
      setIsRunning(false); // Stop the timer on page load
      setBtn("Start");
    }
  }, [id]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          setTimeInLocalStorage(newTime);
          return newTime;
        });
      }, 10);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, id]);

  const setTimeInLocalStorage = (newTime) => {
    const storedTodos = JSON.parse(localStorage.getItem("tasks"));
    storedTodos.forEach((el) => {
      if (el.id === id) {
        el.status = newTime;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(storedTodos));
  };

  useEffect(() => {
    setTimeInLocalStorage(time); // Save the initial time when the Stopwatch component mounts
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setBtn("Stop");
  };

  const handleStop = () => {
    setIsRunning(false);
    setBtn("Start");
  };

  const formatTime = (timeInMilliseconds) => {
    const milliseconds = timeInMilliseconds % 100;
    const seconds = Math.floor((timeInMilliseconds / 100) % 60);
    const minutes = Math.floor(timeInMilliseconds / 6000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(
      milliseconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="stopwatch">
      <p>{formatTime(time)}</p>
      <button onClick={btn === "Start" ? handleStart : handleStop}>{btn}</button>
    </div>
  );
}
