import { BaseComponent } from "../lib/BaseComponent";
import { todos, todoCount } from "../services/todo.service";

export default class TodoList extends BaseComponent {
  constructor() {
    super("list");
  }
  setup() {
    const { list, totalTodos, title, emptyMessage } = this.refs;

    this.addEffect(() => {
      if (todoCount.value === 0) {
        totalTodos.innerHTML = "All done!";
        title.style.display = "none";
        emptyMessage.style.display = null;
      } else {
        totalTodos.innerHTML = todoCount.value;
        title.style.display = null;
        emptyMessage.style.display = "none";
      }
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
    return /*html*/ `
            <h2 data-ref="list.title">Number of todos: <span data-ref="list.totalTodos"></span></h2>
            <h2 data-ref="list.emptyMessage">Start adding todos!</h2>
            <ul data-ref="list.list"></ul>
        `;
  }
}

if (!customElements.get("todo-list"))
  customElements.define("todo-list", TodoList);
