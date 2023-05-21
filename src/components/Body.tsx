import { useState } from 'react';
import '../styles/Body.scss';
import { TaskList } from './TaskList';
import { Todo } from '../types/todo';
import { addTodo } from '../api/methods';
import { EditComp } from './EditComp';

type Props = {
  todos: Todo[];
  deadline: string;
};

export const Body: React.FC<Props> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [deadline, setDeadline] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editQuery, setEditQuery] = useState('');
  const [info, setInfo] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [warning, setWarning] = useState('');

  const handleAddTodo = async (title: string, deadline: string) => {
    if (title.length < 15) {
      setWarning('Title must be at least 15 characters long');
      return;
    }

    if (deadline.length < 6) {
      setWarning('Deadline must be filled');
      return;
    }

    const newTodo = await addTodo(title, deadline);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    try {
      setQuery('');
      setDeadline('');
      setWarning('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <body className='main'>
      <div className='body'>
        <div className=''>
          <div>
            {warning && (
              <div className='warning'>
                <span>{warning}</span>
                <button onClick={() => setWarning('')}>Close</button>
              </div>
            )}
            <div className='input-wrapper'>
              {query && (
                <>
                  <button
                    className='clearBtn'
                    onClick={() => setQuery('')}>
                    x
                  </button>
                  <div className='wordCount'>{`${query.length} / 40 `}</div>
                </>
              )}

              <input
                type='text'
                className='taskField'
                placeholder='What needs to be done?'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className='container'>
              <div className='functions'>
                <div className='deadlineField'>Deadline</div>
                <input
                  type='date'
                  value={deadline}
                  className='inputDate'
                  onChange={(e) => setDeadline(e.target.value)}></input>
                <button
                  className='addBtn'
                  onClick={() => handleAddTodo(query, deadline)}>
                  Add task
                </button>
              </div>
            </div>
          </div>

          <TaskList
            todos={todos}
            setTodos={setTodos}
            setIsEditing={setIsEditing}
            setSelectedTodo={setSelectedTodo}
            editQuery={editQuery}
            setEditQuery={setEditQuery}
            info={info}
            setInfo={setInfo}
            newDeadline={newDeadline}
            setNewDeadline={setNewDeadline}
            isEditing={false}
          />
          {isEditing && (
            <EditComp
              selectedTodo={selectedTodo}
              setTodos={setTodos}
              todos={todos}
              editQuery={editQuery}
              setEditQuery={setEditQuery}
              info={info}
              setInfo={setInfo}
              newDeadline={newDeadline}
              setNewDeadline={setNewDeadline}
              setIsEditing={setIsEditing}
              setDeadline={setDeadline}
            />
          )}
        </div>
      </div>
    </body>
  );
};
