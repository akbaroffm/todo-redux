import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Todo from './Todo';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    dispatch({ type: 'ADD_TODO', payload: inputValue });
    setInputValue('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Enter your Todo</h2>
      <input
        type="text"
        placeholder="Add Todo"
        value={inputValue}
        onChange={handleInputChange}
        className='flex-grow border rounded-l py-2 px-4'
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r" onClick={handleAddTodo}>Add</button>
      <ul className='flex flex-col items-center'>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
