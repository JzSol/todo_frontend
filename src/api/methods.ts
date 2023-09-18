import axios from 'axios';
import { Todo } from '../types/todo';

axios.defaults.baseURL =
  'https://todo-backend-test-6fe63e1e5daa.herokuapp.com/';
// axios.defaults.baseURL = 'https://localhost:8080/';

export function wait(delay = 0) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function getAll(): Promise<Todo[]> {
  return axios.get('/').then((res) => res.data);
}

export function addTodo(title: string, deadline: Date): Promise<Todo> {
  return wait(0)
    .then(() => axios.post('/', { title, deadline }))
    .then((res) => res.data);
}

export function deleteTodo(id: number): Promise<void> {
  return wait().then(() => axios.delete(`/todos/${id}`));
}

export function editTodo(
  id: number,
  title: string,
  completed: boolean
): Promise<Todo> {
  return wait()
    .then(() => axios.put(`/todos/${id}`, { title, completed }))
    .then((res) => res.data);
}

export function updateTodo(
  id: number,
  updateData: { title?: string; deadline?: string; info?: string }
): Promise<Todo> {
  return wait()
    .then(() => axios.patch(`/todos/${id}`, updateData))
    .then((res) => res.data);
}
