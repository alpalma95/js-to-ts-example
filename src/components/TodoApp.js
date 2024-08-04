import { BaseComponent } from "../lib/BaseComponent.js";
import { state } from "../lib/state.js";

export default class TodoApp extends BaseComponent {
  constructor() {
    super('app');
  }
  setup() {
    const { counter } = this.refs;
    const { initialCount } = this.props;
    const count = state(+initialCount);
    const test = state('hi');
    
    this.addEffect(() => { 
      counter.innerHTML = count.value;
      console.log(test.value);
    }, [count, test])

    this.handlers = {
      inc: () => count.next(count.value + 1),
    }
  }

  render(props) {
    return /* html */ `
      <h1>Hello World - <span data-ref="app.counter">${props.initialCount}</span></h1>
      <button data-handle="app.click:inc">Increment</button>
      <todo-list></todo-list>
    `;
  }
}
