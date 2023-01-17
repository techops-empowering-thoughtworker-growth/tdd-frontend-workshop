import React, { useEffect, useState } from 'react';
import './styles/_style.scss';
import axios from 'axios';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [todo, setTodo] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/tasks')
      .then((res) => res.data)
      .then((items) => setTodoItems(items));
  }, []);

  const handleAdd = () => {
    axios
      .post('http://localhost:8080/tasks', {
        name: todo,
        completed: false,
      })
      .then((res) => res.data)
      .then((todo) => setTodoItems([...todoItems, todo]));
    setTodo('');
  };

  const handleDelete = (e) => {
    const deleteId = e.target.id;
    const filteredList = todoItems.filter((item) => item.id !== +deleteId);
    axios.delete(`http://localhost:8080/tasks/${deleteId}`).then(() => {
      setTodoItems(filteredList);
    });
  };

  const handleUpdate = (e) => {
    const updateId = e.target.id;
    const taskToUpdate = todoItems.find((item) => item.id === +updateId);
    axios
      .put(`http://localhost:8080/tasks/${updateId}`, {
        name: taskToUpdate.name,
        completed: !taskToUpdate.completed,
      })
      .then((res) =>
        setTodoItems(
          todoItems.map((item) => (item.id === +updateId ? res.data : item))
        )
      );
  };

  return (
    <div className={'main'}>
      <div className={'input-component'}>
        <h1 className={'title'}>Use this to manage your life and work</h1>
        <div className={'input-bar'}>
          <input
            className={'add-input'}
            value={todo}
            placeholder={'Enter your todo item'}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div className={`add-button`} onClick={handleAdd}>
            +
          </div>
        </div>
      </div>
      <div className={'todo-list'}>
        {todoItems
          .filter((task) => !task.completed)
          .map((task) => (
            <li className={'task-item'} key={task.id}>
              <input type={'checkbox'} id={task.id} onClick={handleUpdate} />
              <p className={'task-text'}>{task.name}</p>
              <i className={'bi-trash'} id={task.id} onClick={handleDelete}></i>
            </li>
          ))}
      </div>
      <div className={'completed-list'}>
        <h2>Completed</h2>
        {todoItems
          .filter((task) => task.completed)
          .map((task) => (
            <li className={'task-item'} key={task.id}>
              <input
                type={'checkbox'}
                defaultChecked={true}
                id={task.id}
                onClick={handleUpdate}
              />
              <p className={'task-text'}>{task.name}</p>
              <i className={'bi-trash'} id={task.id} onClick={handleDelete}></i>
            </li>
          ))}
      </div>
    </div>
  );
}

export default App;
