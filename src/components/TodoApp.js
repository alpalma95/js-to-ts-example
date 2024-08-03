import { BaseComponent } from "../lib/BaseComponent.js";
import { state } from "../lib/state.js";

export default class TodoApp extends BaseComponent {
  constructor() {
    super();
  }

  setup() {
    const { button, counter } = this.refs;
    const { initialCount } = this.props;
    const count = state(+initialCount);
    
    this.addEffect(count.register((val) => { 
      counter.innerHTML = val;
    }))

    button.addEventListener("click", () => {
      count.next(count.value + 1);
    });
  }

  render(props) {
    return /* html */ `
      <h1>Hello World - <span data-ref="counter">${props.initialCount}</span></h1>
      <button data-ref="button">Click me</button>
      <todo-list></todo-list>
    `;
  }
}
