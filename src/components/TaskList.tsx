import { useEffect } from 'react';
import { editTodo, getAll } from '../api/methods';
import { deleteTodo } from '../api/methods';
import '../styles/TaskList.scss';
import classNames from 'classnames';
import { Todo } from '../types/todo';

type Props = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  setSelectedTodo: (selectedTodo: Todo | null) => void;
  editQuery: string;
  setEditQuery: (editQuery: string) => void;
  info: string;
  setInfo: (info: string) => void;
  newDeadline: string;
  setNewDeadline: (newDeadline: string) => void;
};

export const TaskList: React.FC<Props> = ({
  todos,
  setTodos,
  setIsEditing,
  setSelectedTodo,
}) => {
  useEffect(() => {
    getAll().then(setTodos);
  }, [todos, setTodos]);

  const handleDelete = (todoId: number) => {
    deleteTodo(todoId)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== todoId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggle = (todo: Todo) => {
    const updatedTodo = { ...todo, completed: !todo.completed };
    editTodo(updatedTodo.id, updatedTodo.title, updatedTodo.completed)
      .then(() => {
        setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setIsEditing(true);
  };

  return (
    <div className='list'>
      {todos &&
        todos.map((todo) => {
          const format = todo.deadline
            .replaceAll('-', '.')
            .slice(0, 10)
            .split(' ')
            .reverse()
            .join(' ');
          const reverseFormat = format.split('.').reverse().join('.');

          return (
            <div
              className='item'
              key={todo.id}>
              <label
                htmlFor='task-checkbox'
                className={classNames('custom-checkbox', {
                  active: todo.completed,
                })}
                onClick={() => handleToggle(todo)}></label>
              <span
                className='title'
                onClick={() => handleOnTodoClick(todo)}>
                {todo.title}
              </span>
              <div className='date'>{reverseFormat}</div>
              <input
                type='checkbox'
                className='delete'
                id='delete-checkbox'></input>
              <label
                className='custom-checkbox-delete active'
                htmlFor='delete-checkbox'
                onClick={() => handleDelete(todo.id)}></label>
            </div>
          );
        })}
    </div>
  );
};
