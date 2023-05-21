import './styles/App.scss';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { Todo } from './types/todo';

type Props = {
  todos: Todo[];
};

export const App: React.FC<Props> = ({ todos }) => {
  return (
    <div className='App'>
      <Header />
      <Body
        todos={todos}
        deadline={''}
      />
    </div>
  );
};
