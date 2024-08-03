import TodoApp from "./src/components/TodoApp.js";
import TodoList from "./src/components/TodoList.js";
import TodoItem from "./src/components/TodoItem.js";

if (!customElements.get("app-root")) customElements.define("todo-app", TodoApp);
if (!customElements.get("todo-list")) customElements.define("todo-list", TodoList);
if (!customElements.get("todo-item")) customElements.define("todo-item", TodoItem);