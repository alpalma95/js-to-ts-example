const runEffect = (cb) => ({ cb });
export const state = (value, mutations = {}) => {
  const internal = ({
    value,
    effects: [],
    register(cb) {
      const effect = runEffect(cb);
      this.effects.push(effect);
      cb(this.value);
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
  
      this.effects.forEach((eff) => eff.cb(this.value));
    },
  })
  for (const mutation of Object.values(mutations)) {
    internal[mutation.name] = mutation.bind(internal);
  }
 
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
