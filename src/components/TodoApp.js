import { BaseComponent } from "../lib/BaseComponent.js";

export default class TodoApp extends BaseComponent {
  constructor() {
    super();
    console.log(this.localName)
  }
  render() {
    return /* html */ `
      <h1>Todo App - Vanilla JS</h1>
      <add-todo></add-todo>
      <todo-list></todo-list>
    `;
  }
}

if (!customElements.get("todo-app")) customElements.define("todo-app", TodoApp);
