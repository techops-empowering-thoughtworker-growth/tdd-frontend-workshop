import React, { useEffect, useState } from 'react';
import './styles/_style.scss';
import axios from 'axios';

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(
    () =>
      axios
        .get('http://localhost:8080/tasks')
        .then((res) => res.data)
        .then((items) => setTodoItems(items)),
    []
  );

  return (
    <div className={'main'}>
      <div className={'input-component'}>
        <h1 className={'title'}>Use this to manage your work and life</h1>
        <div className={'input-bar'}>
          <input className={'add-input'} placeholder={'Enter your todo item'} />
          <div className={'add-button'}>+</div>
        </div>
      </div>
      <div className={'todo-list'}>
        {todoItems
          .filter((item) => !item.completed)
          .map((item) => (
            <li className={'task-item'} key={item.id}>
              <input type={'checkbox'} />
              <p className={'task-text'}>{item.name}</p>
            </li>
          ))}
      </div>
      <div className={'completed-list'}>
        <h2 className={'completed-title'}>Completed</h2>
        {todoItems
          .filter((item) => item.completed)
          .map((item) => (
            <li className={'task-item'} key={item.id}>
              <input type={'checkbox'} />
              <p className={'task-text'}>{item.name}</p>
            </li>
          ))}
      </div>
    </div>
  );
}

export default App;
