import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const InputTodo = (props) => {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim()) {
      axios
        .post('http://localhost:8080/tasks', {
          name: inputText,
          completed: false,
        })
        .then((res) => res.data)
        .then((todo) => props.setTodoItems([...props.todoItems, todo]));
      setInputText('');
    } else {
      alert('Please write item');
    }
  };

  return (
    <div className={'input-bar'}>
      <input
        className={'add-input'}
        value={inputText}
        placeholder={'Enter your todo item'}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className={`add-button`} onClick={handleAdd}>
        +
      </div>
    </div>
  );
};

InputTodo.propTypes = {
  addTodoProps: PropTypes.func,
};

export default InputTodo;
