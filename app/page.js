'use client'
import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = { id: Date.now(), text: newTaskText, completed: false };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  const uncompletedTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="mx-auto p-4 h-screen bg-gray-100 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">To-Do List</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-white text-black border border-gray-300 rounded p-4 flex-grow"
          placeholder="What to do?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4 hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
      <div className="bg-blue rounded p-4 shadow-lg flex-grow">
        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-blue-500">
          <p>{uncompletedTasksCount} tasks left</p>
          <div>
            <button 
              onClick={() => setFilter('all')} 
              className={`mr-2 ${filter === 'all' ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-700 focus:outline-none`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`mr-2 ${filter === 'active' ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-700 focus:outline-none`}
            >
              Active
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`${filter === 'completed' ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-700 focus:outline-none`}
            >
              Completed
            </button>
          </div>
          <div className='space-x-2'>
            <button
              onClick={() => setTasks(tasks.filter(task => !task.completed))}
              className="text-gray-600 hover:text-blue-700 focus:outline-none"
            >
              Clear Completed
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}
