import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Todo = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoText, setNewTodoText] = useState('');
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(!isEditing);
    setNewTodoText(todo.text);
  };

  const handleUpdate = () => {
    dispatch({ type: 'UPDATE_TODO', payload: { id: todo.id, text: newTodoText } });
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (isEditing) {
        handleUpdate();
      } else {
        dispatch({ type: 'ADD_TODO', payload: { text: newTodoText } });
        setNewTodoText('');
      }
    }
  };

  const completedStyle = {
    textDecoration: todo.completed ? 'line-through' : 'none',
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  return (
    <li className="flex items-center justify-between bg-blue-100 py-2 pr-2 mt-2 w-[270px] rounded-md" key={todo.id}>
      {isEditing ? (
        <input
          type="text"
          className="border rounded py-1 px-2 mr-2"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <>
          <span className="mx-2" style={completedStyle}>{todo.text}</span>
          <div>
            <button
              className="text-blue-500 hover:text-blue-700 mr-2"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default Todo;
