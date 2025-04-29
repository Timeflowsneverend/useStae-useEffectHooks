import React, { useState } from 'react';
import '../App.css';

const UseState = () => {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');

  return (
    
    <div className="container">
      <h1>Task Manager ({tasks.length})</h1>
      
      {/* Add Task Form */}
      <div className="form-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter task..."
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (inputText.trim()) {
              setTasks([...tasks, {
                id: Date.now(),
                text: inputText,
                completed: false
              }]);
              setInputText('');
            }
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                setTasks(tasks.map(t => 
                  t.id === task.id ? {...t, completed: !t.completed} : t
                ))
              }}
            />
            <span className={task.completed ? 'completed' : ''}>
              {task.text}
            </span>
            <button
              className="delete-btn"
              onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Status Message */}
      {tasks.length === 0 && <p>No tasks found. Add your first task!</p>}
      
    </div>
    
  );
};

export default UseState;