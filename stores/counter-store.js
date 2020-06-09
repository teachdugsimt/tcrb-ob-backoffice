// src/stores/counter-store.tsx
import { observable, action, computed } from 'mobx'

class CounterStore {
  @observable
  count = 0

  @action
  increment() {
    this.count++
  }

  @action
  decrement() {
    this.count--
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}
export default CounterStore
