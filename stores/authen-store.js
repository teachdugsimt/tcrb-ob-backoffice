import { observable, action, computed } from "mobx"
import { create, persist } from 'mobx-persist'

class AuthenStore {
  @persist @observable id = ""
  @persist @observable password = ""
  @observable type = ""
  // @observable menu = [
  //   { key: 1, id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", link_to: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
  //   { key: 2, id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", link_to: "/customer-service-menu", color: "#000000", typeLv: "38" },
  //   { key: 3, id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", link_to: "/partner-mangement", color: "#000000", typeLv: "38" },
  //   { key: 4, id: 4, name: "PRODUCT ONBOARDING", translate: "productOnboarding", link_to: "/product-onboarding", color: "#000000", typeLv: "38" },
  //   { key: 5, id: 5, name: "CONSENT MANAGEMENT", translate: "consentManagement", link_to: "/", color: "#000000", typeLv: "30" },
  //   { key: 6, id: 6, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", link_to: "/", color: "#000000", typeLv: "30" },
  //   { key: 7, id: 7, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", link_to: "/", color: "#000000", typeLv: "50" },
  //   { key: 8, id: 8, name: "NOTIFICATION ENQUIRY", translate: "notificationEnquiry", link_to: "/", color: "#000000", typeLv: "50" },
  //   { key: 9, id: 9, name: "BRANCH LOCATION ENQUIRY", translate: "branchLocation", link_to: "/", color: "#000000", typeLv: "12" },
  //   { key: 10, id: 10, name: "LIVE CHAT ENQUIRY", translate: "liveChat", link_to: "/", color: "#000000", typeLv: "12" },
  //   { key: 11, id: 11, name: "MARKETING ADS ENQUIRY", translate: "marketingAds", link_to: "/", color: "#000000", typeLv: "12" },
  //   { key: 12, id: 12, name: "DASHBOARD & REPORTS", translate: "dashboardReports", link_to: "/", color: "#000000", typeLv: "42" },
  //   { key: 13, id: 13, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", link_to: "/parameters-setup", color: "#000000", typeLv: "42" },
  //   { key: 14, id: 14, name: "PENDING APPROVE", translate: "pendingApprove", link_to: "/pending-approve", color: "#000000", typeLv: "42" },
  //   { key: 15, id: 15, name: "USER ACCESS MANAGEMENT ", translate: "useAccessManagementEnquiry", link_to: "/user-access-management", color: "#000000", typeLv: "42" },
  //   { key: 16, id: 16, name: "DEVICE ENQUIRY", translate: "deviceEnquiry", link_to: "/", color: "#000000", typeLv: "42" },
  // ]
  @observable menu = []

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
