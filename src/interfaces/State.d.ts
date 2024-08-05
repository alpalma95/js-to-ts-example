export type VoidFunction = () => void;

export interface Effect {
  cb: VoidFunction;
}

export interface State<T> {
  value: T;
  effects: Effect[];
  register: (cb: VoidFunction) => ( VoidFunction );
  unregister: (effect: Effect) => void;
  next: (newValue: T | ((oldValue: T) => T)) => void;
}