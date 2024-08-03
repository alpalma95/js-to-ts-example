import { BaseComponent } from "../lib/BaseComponent";
import { todos, addTodo, todoCount } from "../services/todo.service";

export default class TodoList extends BaseComponent {
  setup() {
    const { list, totalTodos, title } = this.refs;

    const renderTodos = todos.register((todos) => {
      list.innerHTML = todos
        .map(
          (todo) => /* html */ `
              <todo-item data-id="${todo.id}" data-text="${todo.text}"></todo-item>
          `
        )
        .join("");
    });

    const totalTodosCount = todoCount.register((count) => {
      totalTodos.innerHTML = count == 0 ? "All done!" : count;
      title.style.display = count == 0 ? "none" : null;
    });

    this.handlers.add = addTodo;

    this.addEffect(renderTodos, totalTodosCount);
  }

  render() {
    return /* html */ `
            <button data-handle="click:add">Add Todo</button>
            <h2 data-ref="title">Number of todos:</h2>
            <h3 data-ref="totalTodos"></h3>
            <ul data-ref="list"></ul>
        `;
  }
}
