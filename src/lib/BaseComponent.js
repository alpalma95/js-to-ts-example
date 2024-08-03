export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.props = this.dataset;
        this.effects = [];
    }

    addEffect(...effects) {
        this.effects.push(...effects);
        console.log(this.effects);
    }
    connectedCallback() {
        this.innerHTML = this.render(this.props);
        this.refs = [... this.querySelectorAll("[data-ref]")].reduce((acc, el) => {
            acc[el.dataset.ref] = el;
            return acc;
        }, {});
        this.setup?.();
        this.onInit?.();
    }

    disconnectedCallback() {
        this.onDestroy?.();
        this.cleanups.forEach((cleanup) => cleanup());
    }
} 