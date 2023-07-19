import React, { useState, useEffect } from 'react';
import './StopWatch.scss';

function StopWatch({ id, initialTime, isHovered }) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [btn, setBtn] = useState('Start');

  useEffect(() => {
    const storedTime = localStorage.getItem(`stopwatchTime_${id}`);
    if (storedTime) {
      setTime(parseInt(storedTime));
      setIsRunning(false);
      setBtn('Start');
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
  const storedTodos = JSON.parse(localStorage.getItem(`tasks_${id}`)) || [];

  const updatedTodos = storedTodos.map((el) => {
    if (el.id === id) {
      return { ...el, time: newTime };
    }
    console.log(el.time)
    return el;
  });

  localStorage.setItem(`tasks_${id}`, JSON.stringify(updatedTodos));
};


  useEffect(() => {
    setTimeInLocalStorage(time);
  }, [time]);

  const handleStart = () => {
    setIsRunning(true);
    setBtn('Stop');
    setTime((prevTime) => prevTime);
  };

  const handleStop = () => {
    setIsRunning(false);
    setBtn('Start');
  };

  const formatTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / 360000);
    const minutes = Math.floor((timeInMilliseconds % 360000) / 6000);
    const seconds = Math.floor((timeInMilliseconds % 6000) / 100);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className={`stopwatch ${isHovered ? 'stopWatchAnimation' : ''}`}>
      <p>{formatTime(time)}</p>
      <button onClick={btn === 'Start' ? handleStart : handleStop} className={isRunning ? 'active-btn btn' : 'btn'}>{btn}</button>
    </div>
  );
}

export default StopWatch;
