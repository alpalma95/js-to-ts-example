import { BaseComponent } from "../lib/BaseComponent";
import { state } from "../lib/state";

export default class TodoList extends BaseComponent {
  constructor() {
    super();
  }

  todos = state([
    { id: 1, text: "Learn JavaScript" },
    { id: 2, text: "Learn Vue" },
    { id: 3, text: "Learn Svelte" },
  ]);

  setup() {
    const { list, add } = this.refs;

    const renderTodos = this.todos.register((todos) => {
        list.innerHTML = todos
          .map(
            (todo) => /* html */ `
              <li>${todo.text}</li>
          `
          )
          .join("");
      })

      add.addEventListener("click", () => {
        this.todos.next([...this.todos.value, { id: Date.now(), text: "New Todo" }]);
      });

    this.addEffect(renderTodos);
  }

  render() {
    return /* html */ `
            <ul data-ref="list">
            </ul>
            <button data-ref="add">Add</button>
        `;
  }
}
