import axios from 'axios';
import queryString from 'query-string';
import { TodoInterface, TodoGetQueryInterface } from 'interfaces/todo';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTodos = async (query?: TodoGetQueryInterface): Promise<PaginatedInterface<TodoInterface>> => {
  const response = await axios.get('/api/todos', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTodo = async (todo: TodoInterface) => {
  const response = await axios.post('/api/todos', todo);
  return response.data;
};

export const updateTodoById = async (id: string, todo: TodoInterface) => {
  const response = await axios.put(`/api/todos/${id}`, todo);
  return response.data;
};

export const getTodoById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/todos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTodoById = async (id: string) => {
  const response = await axios.delete(`/api/todos/${id}`);
  return response.data;
};
