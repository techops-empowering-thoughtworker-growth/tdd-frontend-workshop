import React, { useEffect, useState } from 'react';
import '../styles/_style.scss';
import axios from 'axios';
import TodoList from './TodoList';
import InputTodo from './InputTodo';

function TodoContainer() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/tasks')
      .then((res) => res.data)
      .then((items) => setTodoItems(items));
  }, []);

  return (
    <div className={'main'}>
      <div className={'input-component'}>
        <h1 className={'title'}>Use this to manage your life and work</h1>
        <InputTodo todoItems={todoItems} setTodoItems={setTodoItems} />
      </div>
      <TodoList
        styleName={'todo-list'}
        todoItems={todoItems}
        setTodoItems={setTodoItems}
        isCompleted={false}
      />
      <TodoList
        styleName={'completed-list'}
        todoItems={todoItems}
        setTodoItems={setTodoItems}
        isCompleted={true}
      />
    </div>
  );
}

export default TodoContainer;
