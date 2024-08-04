import { BaseComponent } from "../lib/BaseComponent";
import { removeTodo } from "../services/todo.service";

export default class TodoItem extends BaseComponent {
  constructor() {
    super("item");
  }
  setup() {
    this.handlers.removeTodo = () => removeTodo(+this.props.id);
  }

  render(props) {
    return /*html*/ `
            <li class="item">
                <span>${props.text}</span>
                <button data-handle="item.click:removeTodo">Delete</button>
            </li>
        `;
  }
}

if (!customElements.get("todo-item"))
  customElements.define("todo-item", TodoItem);
