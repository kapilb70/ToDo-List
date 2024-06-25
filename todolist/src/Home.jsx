// Home.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';
import './App.css';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => {
        console.log(result.data);
        setTodos(result.data);
      })
      .catch(err => {
        console.log(err);
      });

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.classList.toggle('body-dark', savedDarkMode);
    document.body.classList.toggle('body-light', !savedDarkMode);

    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    updateProgress();
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('body-dark', darkMode);
    document.body.classList.toggle('body-light', !darkMode);
  }, [darkMode]);

  const handleEdit = (id) => {
    axios.put(`http://localhost:3001/update/${id}`)
      .then(result => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(result => {
        location.reload();
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleAdd = () => {
    if (newTask.trim() === "") return;

    axios.post('http://localhost:3001/add', { task: newTask })
      .then(result => {
        setTodos([...todos, result.data]);
        setNewTask("");
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const updateProgress = () => {
    const completedTasks = todos.filter(todo => todo.done).length;
    const totalTasks = todos.length;
    const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

    const progressRing = document.querySelector('.progress_ring');
    if (progressRing) {
      const radius = progressRing.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;

      progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
      progressRing.style.strokeDashoffset = offset;
    }
  }

  return (
    <div className="home">
      <h2>ToDo-
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        List</h2>
      <button className="toggle_button" onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="progress_container">
        <svg>
          <circle className="progress_ring" cx="50" cy="50" r="40" />
        </svg>
      </div>
      <div className="create_form">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          onKeyPress={handleKeyPress} 
          placeholder="Enter Task" 
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {
        todos.length === 0
          ? <div className="no_record"><h2>No Record</h2></div>
          : 
          todos.map(todo => (
              <div key={todo._id} className='task'>
                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                  {todo.done ? 
                    <BsFillCheckCircleFill className='icon' />
                    : <BsCircleFill className='icon' />
                  }
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div onClick={() => handleDelete(todo._id)}>
                  <span><BsFillTrashFill className='icon' /></span>
                </div>
              </div>
            ))
      }
    </div>
  );
}

export default Home;
