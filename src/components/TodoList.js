import { BaseComponent } from "../lib/BaseComponent";
import { todos, addTodo, todoCount } from "../services/todo.service";

export default class TodoList extends BaseComponent {
    constructor() {
        super("todo-list");
    }
  setup() {
    const { list, totalTodos, title } = this.refs;

    this.handlers.add = addTodo;

    this.addEffect(() => {
      totalTodos.innerHTML =
        todoCount.value == 0 ? "All done!" : todoCount.value;
      title.style.display = todoCount.value == 0 ? "none" : null;
    }, [todoCount]);

    this.addEffect(() => {
      list.innerHTML = todos.value
        .map(
          (todo) => /* html */ `
                <todo-item data-id="${todo.id}" data-text="${todo.text}"></todo-item>
            `
        )
        .join("");
    }, [todos]);
  }

  render() {
    return /* html */ `
            <button data-handle="todo-list.click:add">Add Todo</button>
            <h2 data-ref="todo-list.title">Number of todos:</h2>
            <h3 data-ref="todo-list.totalTodos"></h3>
            <ul data-ref="todo-list.list"></ul>
        `;
  }
}
