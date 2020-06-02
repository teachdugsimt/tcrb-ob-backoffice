import { observable, action } from "mobx"
import { createContext } from "react"

class TestStore3 {
    @observable id = "id & pass"
    @observable password = "id & pass"

    @action setProfile = (id, password) => {
        this.id = id
        this.password = password
    }

}

export default createContext(new TestStore3)
