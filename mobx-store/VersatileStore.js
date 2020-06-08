import { observable, action, computed } from "mobx"
import { createContext } from "react"

class VersatileStore {

  @observable sidebarWidth = 288
  @observable isShow = true

  @computed get getSidebar() {
    return this.sidebarWidth
  }
  @action setSidebarWidth = (width) => {
    this.sidebarWidth = width
  }

  @action setIsShow = (status) => {
    console.log("STATUS SET :: ", status)
    this.isShow = status
  }

}

export default createContext(new VersatileStore)
