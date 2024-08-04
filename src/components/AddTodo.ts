import { BaseComponent } from "../lib/BaseComponent";
import { state } from "../lib/state";
import { addTodo } from "../services/todo.service";

export default class AddTodo extends BaseComponent {
  constructor() {
    super("add");
  }

  setup() {
    const { input } = this.refs;
    const currentTodo = state("");

    this.addEffect(() => (input.value = currentTodo.value), [currentTodo]);
    this.handlers.updateCurrentTodo = (e) => currentTodo.next(e.target.value);
    this.handlers.add = () => {
      addTodo(currentTodo.value);
      currentTodo.next("");
    };
  }

  render() {
    return /*html*/ `
            <div class="add">
                <input data-ref="add.input" data-handle="add.input:updateCurrentTodo" type="text" class="new-todo" placeholder="What needs to be done?" autofocus>
                <button data-handle="add.click:add">Add Todo</button>
            </div>
        `;
  }
}

!window.customElements.get("add-todo") &&
  window.customElements.define("add-todo", AddTodo);
