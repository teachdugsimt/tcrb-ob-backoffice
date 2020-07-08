import { observable, action, computed } from "mobx"
import { create, persist } from 'mobx-persist'

class AuthenStore {
  @persist @observable id = ""
  @persist @observable password = ""
  @observable type = ""
  @observable menu = [
    { id: 1, name: "CUSTOMER SERVICES ENQUIRY", linkTo: "/natty", color: "#000000", typeLv: "42" },
    { id: 2, name: "CUSTOMER SERVICES MENU", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
    { id: 3, name: "PARTNER MANAGEMENT", linkTo: "/natty", color: "#000000", typeLv: "38" },
    { id: 4, name: "CONSENT MANAGEMENT", linkTo: "/natty", color: "#000000", typeLv: "30" },
    { id: 5, name: "TERM & CONDITION MANAGEMENT", linkTo: "/", color: "#000000", typeLv: "30" },
    { id: 6, name: "SECURITY CODE ENQUIRY", linkTo: "/", color: "#000000", typeLv: "50" },
    { id: 7, name: "NOTIFICATION ENQUIRY", linkTo: "/", color: "#000000", typeLv: "50" },
    { id: 8, name: "BRANCH LOCATION ENQUIRY", linkTo: "/", color: "#000000", typeLv: "12" },
    { id: 9, name: "LIVE CHAT ENQUIRY", linkTo: "/", color: "#000000", typeLv: "12" },
    { id: 10, name: "MARKETING ADS ENQUIRY", linkTo: "/", color: "#000000", typeLv: "12" },
    { id: 11, name: "DASHBOARD & REPORTS", linkTo: "/", color: "#000000", typeLv: "42" },
    { id: 12, name: "BUSINESS PARAMETERS SETUP", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
    { id: 13, name: "USER ACCESS MANAGEMENT ENQUIRY", linkTo: "/user-access-management", color: "#000000", typeLv: "42" },
    { id: 14, name: "DEVICE ENQUIRY", linkTo: "/", color: "#000000", typeLv: "42" },
  ]

  @action setProfile = (id, password) => {
    this.id = id
    this.password = password
  }
  @action setType = (type) => {
    this.type = type
  }

  @action clear = () => {
    this.password = null
    this.type = null
    this.id = null
  }

  @action
  setMenu = (menu) => {
    this.menu = menu
  }

  @computed get getMenu() {
    let arr = this.menu.filter(e => e.typeLv <= this.type)
    return arr
  }

}
export default AuthenStore


// test commit
