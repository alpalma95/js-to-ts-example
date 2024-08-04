import { derived, state } from "../lib/state";

export const todos = state([]);

export const todoCount = derived(() => todos.value.length, [todos]);

export const addTodo = (text) => {
  const id = Date.now();
  todos.next([...todos.value, { id: id, text }]);
};

export const removeTodo = (id) =>
  todos.next(todos.value.filter((todo) => todo.id !== id));
