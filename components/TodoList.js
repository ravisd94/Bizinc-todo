// TodoList.js
import React, { useState } from 'react';

function TodoList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addItem = () => {
    if (inputValue.trim() !== '') {
      const newItem = {
        id: Date.now(),
        text: inputValue,
      };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  const markItemComplete = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <h2 className="text-2xl text-center p-4 bg-blue-500 text-white">To-Do List</h2>
      <div className="p-4">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add new item"
            className="flex-grow border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button onClick={addItem} className="bg-blue-500 text-white py-2 px-4 rounded-r transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">Add</button>
        </div>
        <ul className="mt-4">
          {items.map((item) => (
            <li key={item.id} className={`flex items-center justify-between bg-gray-100 px-4 py-2 mb-2 rounded-md shadow-md ${item.completed ? 'line-through' : ''}`}>
              <span onClick={() => markItemComplete(item.id)} className="cursor-pointer">{item.text}</span>
              <div>
                <button onClick={() => removeItem(item.id)} className="text-red-500 focus:outline-none hover:text-red-700">&#10006;</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
