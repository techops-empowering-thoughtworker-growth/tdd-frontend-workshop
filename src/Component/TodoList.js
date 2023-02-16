import React from 'react';
import axios from 'axios';

const TodoList = (props) => {
  const { todoItems, isCompleted, setTodoItems } = props;
  const filteredTodoItems = isCompleted
    ? todoItems.filter((task) => task.completed)
    : todoItems.filter((task) => !task.completed);

  const handleDelete = (e) => {
    const deleteId = e.target.id;
    axios.delete(`http://localhost:8080/tasks/${deleteId}`).then(() => {
      setTodoItems(todoItems.filter((item) => item.id !== +deleteId));
    });
  };

  const handleUpdate = (updateId) => {
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
    <ul className={isCompleted ? 'completed-list' : 'todo-list'}>
      {isCompleted === true && <h2>Completed</h2>}
      {filteredTodoItems.map((todo) => (
        <li className={'task-item'} key={todo.id}>
          <input
            type={'checkbox'}
            defaultChecked={isCompleted}
            id={todo.id}
            onClick={() => handleUpdate(todo.id)}
          />
          <p className={'task-text'}>{todo.name}</p>
          <i className={'bi-trash'} id={todo.id} onClick={handleDelete}></i>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
