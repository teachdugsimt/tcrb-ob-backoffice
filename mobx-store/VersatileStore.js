import { observable, action } from "mobx"
import { createContext } from "react"

class VersatileStore {
    @observable sidebarWidth = 288

    @action setSidebarWidth = (width) => {
        this.sidebarWidth = width
    }

}

export default createContext(new VersatileStore)
