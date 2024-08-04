import { BaseComponent } from "../lib/BaseComponent.ts";

export default class TodoApp extends BaseComponent {
  render() {
    return /* html */ `
      <h1>Todo App - Vanilla JS</h1>
      <add-todo></add-todo>
      <todo-list></todo-list>
    `;
  }
}

if (!customElements.get("todo-app")) customElements.define("todo-app", TodoApp);
