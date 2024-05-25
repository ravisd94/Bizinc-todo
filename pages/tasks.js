// pages/tasks.js
import React, { useState, useEffect } from 'react';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async () => {
    if (title.trim() && description.trim()) {
      const newTask = { title, description };
      try {
        const response = await fetch('http://localhost:3001/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTask),
        });
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        const savedTask = await response.json();
        setTasks([...tasks, savedTask]);
        setTitle('');
        setDescription('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Task List</h1>
        <form
          className="flex flex-col mb-6"
          onSubmit={(e) => { e.preventDefault(); addTask(); }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksPage;
