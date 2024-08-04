const Effect = (cb) => ({ cb: () => setTimeout(cb) });
export const state = (value) => {
  const internal = ({
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
        this.value = newValue(this.value);
      } else {
        this.value = newValue;
      }
  
      this.effects.forEach((eff) => eff.cb());
    },
  })
 
  return internal
};

export const derived = (cb, deps = []) => {
  const derived = state(0);
  const c = () => {
    derived.next(cb())
  }
  deps.forEach((dep) => dep.register(c));
  return derived
}
