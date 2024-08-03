export class BaseComponent extends HTMLElement {
    constructor() {
        super();
    }

    props = this.dataset;
    cleanups = [];
    handlers = {};

    addEffect(...effects) {
        this.cleanups.push(...effects);
    }
    connectedCallback() {
        this.innerHTML = this.render(this.props);
        this.refs = [... this.querySelectorAll(`[data-ref]`)].reduce((acc, el) => {
            const refName = el.dataset.ref;
            acc[refName] && Array.isArray(acc[refName]) 
            ? acc[refName].push(el) 
            : acc[refName] ? acc[refName] = [acc[refName], el]
            : acc[refName] = el;
            
            return acc;
        }, {});

        this.setup?.();

        [...this.querySelectorAll(`[data-handle]`)].forEach((el) => {
            const [eventName, handlerName] = el.dataset.handle.split(":");
            el.addEventListener(eventName, (e) => {
                this.handlers?.[handlerName]?.(e);
            });
        })
        this.onInit?.();
    }

    disconnectedCallback() {
        this.onDestroy?.();
        this.cleanups.forEach((cleanup) => cleanup());
    }
} 