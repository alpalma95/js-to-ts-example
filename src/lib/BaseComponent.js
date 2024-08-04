export class BaseComponent extends HTMLElement {
  constructor(baseName) {
    super();
    this.baseName = baseName;
  }

  props = this.dataset;
  cleanups = [];
  handlers = {};

  addEffect(cb, deps = []) {
    const effects = []
    deps.forEach((dep) => { 
        effects.push(dep.register(cb))
     })

    this.cleanups.push(...effects);
  }
  connectedCallback() {
    this.innerHTML = this.render(this.props);
    this.refs = [
      ...this.querySelectorAll(
        `${this.baseName ? `[data-ref^=${this.baseName}]` : "[data-ref]"}`
      ),
    ].reduce((acc, el) => {
      const rawRefName = el.dataset.ref;
      const refName = rawRefName.includes(".")
        ? rawRefName.split(".")[1]
        : rawRefName;

      acc[refName] && Array.isArray(acc[refName])
        ? acc[refName].push(el)
        : acc[refName]
        ? (acc[refName] = [acc[refName], el])
        : (acc[refName] = el);

      return acc;
    }, {});

    this.setup?.();

    [
      ...this.querySelectorAll(
        `${this.baseName ? `[data-handle^=${this.baseName}]` : "[data-handle]"}`
      ),
    ].forEach((el) => {
      const attribute = el.dataset.handle;

      const name = attribute.includes(".")
        ? attribute.split(".").slice(1).at(0).split(":")
        : attribute.split(":");

      const [eventName, handlerName] = name;
      el.addEventListener(eventName, (e) => {
        this.handlers?.[handlerName]?.(e);
      });
    });
    this.onInit?.();
  }

  disconnectedCallback() {
    this.onDestroy?.();
    this.cleanups.forEach((cleanup) => cleanup());
  }
}
