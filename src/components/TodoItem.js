import { BaseComponent } from "../lib/BaseComponent";
import { removeTodo } from "../services/todo.service";

export default class TodoItem extends BaseComponent {
    constructor() {
        super('todo-item');
    }
    setup() {
        this.handlers.removeTodo = () => removeTodo(+this.props.id);
    }

    render(props) {
        return /*html*/`
            <li class="todo-item">
                <span>${props.text}</span>
                <button data-handle="todo-item.click:removeTodo">Delete</button>
            </li>
        `;
    }
}