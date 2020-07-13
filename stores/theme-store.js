// src/stores/theme-store.tsx
import { observable, action } from 'mobx'

class ThemeStore {
  @observable
  theme = 'light'

  @action
  setTheme(newTheme) {
    this.theme = newTheme
  }
}
export default ThemeStore
