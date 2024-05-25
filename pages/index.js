import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        setTodos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    

    fetchData();
  }, []);

  console.log('todos:', todos); // Log the todos state

  return (
    <div className="container mx-auto p-4 w-3/4">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to the Node.js Application</h1>
      <div className="text-center mb-8">
        <Link href="/todo" className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-100">
            Go to Todo List
        </Link>
      </div>
      <hr />
      <h2 className="text-3xl font-bold mb-4 text-center mt-5">To-Do List Fetch from API</h2>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && todos && todos.length > 0 && (
        <div className="overflow-hidden shadow-lg rounded-lg">
          <table className="w-full table-fixed bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="w-1/4 py-2 text-left pl-4">ID</th>
                <th className="w-3/4 py-2 text-left pl-4">Task</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo, index) => (
                <tr key={todo.id} className={index % 2 === 0 ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white hover:bg-gray-200'}>
                  <td className="border border-gray-200 px-4 py-2">{todo.id}</td>
                  <td className="border border-gray-200 px-4 py-2">{todo.task}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && (!todos || todos.length === 0) && (
        <p className="text-center">No todos found</p>
      )}
    </div>
  );
}

export default Home;
