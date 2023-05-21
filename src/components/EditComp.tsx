import { useEffect } from 'react';
import { updateTodo } from '../api/methods';
import '../styles/EditComp.scss';
import { Todo } from '../types/todo';

type Props = {
  setIsEditing: (isEditing: boolean) => void;
  selectedTodo: Todo | null;
  setTodos: (todos: Todo[]) => void;
  todos: Todo[];
  editQuery: string;
  setEditQuery: (editQuery: string) => void;
  info: string;
  setInfo: (info: string) => void;
  newDeadline: string;
  setNewDeadline: (newDeadline: string) => void;
  setDeadline: (deadline: string) => void;
};

export const EditComp: React.FC<Props> = ({
  setIsEditing,
  selectedTodo,
  setTodos,
  todos,
  editQuery,
  setEditQuery,
  info,
  setInfo,
  newDeadline,
  setNewDeadline,
}) => {
  useEffect(() => {
    setInfo(selectedTodo?.info || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTodo]);

  let reverseFormat = '';

  if (selectedTodo !== null) {
    const formatedTimestamp = selectedTodo.timestamp
      .replaceAll('-', '.')
      .slice(0, 10)
      .split(' ')
      .reverse()
      .join(' ');

    reverseFormat = formatedTimestamp.split('.').reverse().join('.');
  } else {
    return null;
  }

  const handleSave = () => {
    if (selectedTodo) {
      const updateData: { title?: string; deadline?: string; info?: string } =
        {};

      if (editQuery) {
        updateData.title = editQuery;
      }
      if (newDeadline) {
        updateData.deadline = newDeadline;
      }
      if (info) {
        updateData.info = info;
      }

      // Pass the updateData object to your updateTodo function
      updateTodo(selectedTodo.id, updateData)
        .then((updatedTodo) => {
          const updatedTodos = todos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          );
          setTodos(updatedTodos);

          setIsEditing(false);
          setEditQuery('');
          setInfo('');
          setNewDeadline('');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className='box'>
      <div className='editBlock'>
        <div className='created'>
          Created: {reverseFormat}
          <button
            className='exitbtn'
            onClick={() => setIsEditing(false)}>
            Exit
          </button>
        </div>

        <input
          type='text'
          className='editTitle'
          placeholder={`Update this Todo:  ${selectedTodo?.title}`}
          value={editQuery}
          onChange={(e) => setEditQuery(e.target.value)}></input>
        <input
          type='text'
          className='makeInfo'
          placeholder='Write todo info'
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />

        <div className='editDeadline'>
          Set new deadline
          <input
            type='date'
            className='editDate'
            onChange={(e) => setNewDeadline(e.target.value)}></input>
          <button
            className='saveBtn'
            onClick={() => handleSave()}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
