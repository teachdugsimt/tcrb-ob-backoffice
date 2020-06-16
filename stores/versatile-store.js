import { observable, action, computed } from "mobx"

class VersatileStore {

  @observable sidebarWidth = 300
  @observable isShow = true

  @computed get getSidebar() {
    return this.sidebarWidth
  }
  @action setSidebarWidth = (width) => {
    this.sidebarWidth = width
  }

  @action setIsShow = (status) => {
    this.isShow = status
  }

}

export default VersatileStore
