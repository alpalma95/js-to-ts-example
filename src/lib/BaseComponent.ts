import type { State, VoidFunction } from "../interfaces/State";

export class BaseComponent extends HTMLElement {
  props: DOMStringMap = this.dataset;
  cleanups: (() => void)[] = [];
  handlers: { [key: string]: (e: Event) => void } = {};
  baseName: string;
  refs: { [key: string]: HTMLElement | HTMLElement[]  } = {};
  constructor(baseName: string) {
    super();
    this.baseName = baseName;
  }

  addEffect(cb: (() => void), deps: State<any>[] = []) {
    const effects: VoidFunction[] = [];
    deps.forEach((dep) => {
      effects.push(dep.register(cb));
    });

    this.cleanups.push(...effects);
  }
  connectedCallback() {
    this.innerHTML = this.render?.(this.props) ?? "";
    this.refs = [
      ...this.querySelectorAll(
        `${this.baseName ? `[data-ref^=${this.baseName}]` : "[data-ref]"}`
      ),
    ].reduce((acc, el) => {
      const rawRefName = (el as HTMLElement).dataset.ref;
      // We know that refName is not null because we checked for it in the querySelectorAll
      const refName = rawRefName!.includes(".")
        ? rawRefName!.split(".")[1] as string
        : rawRefName as string;

        acc[refName] && Array.isArray(acc[refName])
          ? (acc[refName] as HTMLElement[]).push(el as HTMLElement)
          : acc[refName]
          ? (acc[refName] = [acc[refName] as HTMLElement, el as HTMLElement])
          : (acc[refName] = el as HTMLElement);

      return acc;
    }, {} as typeof this.refs);

    this.setup?.();

    [
      ...this.querySelectorAll(
        `${this.baseName ? `[data-handle^=${this.baseName}]` : "[data-handle]"}`
      ),
    ].forEach((el) => {
      const attribute = (el as HTMLElement).dataset.handle;

      // We know that attribute is not null because we checked for it in the querySelectorAll
      const name = attribute!.includes(".")
        ? attribute!.split(".").slice(1)!.at(0)!.split(":")
        : attribute!.split(":");

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

  // Declarations for methods that will be implemented by child classes
  onInit?(): void;
  onDestroy?(): void;
  setup?(): void;
  render?(props: DOMStringMap): string;
}
