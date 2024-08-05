import type { State, Effect, VoidFunction } from "../interfaces/State";

const Effect = (cb: VoidFunction): Effect => ({ cb: () => setTimeout(cb) });

export const state = <T>(value: T): State<T> => {
  const internal: State<T> = ({
    value,
    effects: [],
    register(cb) {
      const effect = Effect(cb);
      this.effects.push(effect);
      setTimeout(cb);
      return () => this.unregister(effect);
    },
    unregister(effect) {
      this.effects = this.effects.filter((e) => e !== effect);
    },
    next(newValue) {
      if (typeof newValue === "function") {
        this.value = (newValue as (oldValue: T) => T)(this.value);
      } else {
        this.value = newValue;
      }
  
      this.effects.forEach((eff) => eff.cb());
    },
  })
 
  return internal
};

export const derived = <T>(cb: () => T, deps: State<any>[] = []) => {
  const derived = state<T>('' as T);
  const c = () => {
    derived.next(cb())
  }
  deps.forEach((dep) => dep.register(c));
  return derived
}
