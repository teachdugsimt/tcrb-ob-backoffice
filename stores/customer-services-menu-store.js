import { observable, action } from 'mobx'

class CustomerServicesMenuStore {
  @observable citizenId = ''
  @observable accountId = ''
  @action setCitizenId = (id) => {
    this.citizenId = id
  }
  @action setAccountId = (id) => {
    this.accountId = id
  }
}
export default CustomerServicesMenuStore
