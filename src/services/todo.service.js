import { derived, state } from "../lib/state";

export const todos = state([
  { id: 1, text: "Learn JavaScript" },
  { id: 2, text: "Learn Vue" },
  { id: 3, text: "Learn Svelte" },
  { id: 4, text: "Learn Solid" },
  { id: 5, text: "Avoid learning React" },
  { id: 6, text: "Avoid learning Angular" },
]);

export const todoCount = derived(() => todos.value.length, [todos]);

export const addTodo = () => {
    const id = Date.now();
    todos.next([...todos.value, { id: id, text: `Todo ${id}` }]);
}

export const removeTodo = (id) =>
  todos.next(todos.value.filter((todo) => todo.id !== id));
