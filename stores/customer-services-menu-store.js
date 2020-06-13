import { observable, action, toJS } from 'mobx'
import { StartupApi } from '../services'

class CustomerServicesMenuStore {
  @observable citizenId = ''
  @observable accountId = {}
  @observable accountSelected = {}
  @observable accountInfo = []
  @observable arrayAccountInfo = []

  @action getData = async (value) => {
    this.citizenId = value
    let tmp = await StartupApi.getAccountInfo(value)

    this.accountInfo = tmp.data
    // this.arrayAccountInfo = toJS(tmp.data)
  }
  @action setCitizenId = (id) => {
    this.citizenId = { idCard: id }
  }
  @action setAccountId = (id) => {
    this.accountId = id
  }
}
export default CustomerServicesMenuStore
