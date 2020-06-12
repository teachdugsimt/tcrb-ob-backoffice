import { observable, action } from 'mobx'
import { StartupApi } from '../services'

class CustomerServicesMenuStore {
  @observable citizenId = ''
  @observable accountId = ''
  @observable accountSelected = {}
  @observable getAccountInfo = []
  @observable arrayAccountInfo = []

  @action getData = async (params) => {
    let tmp = await StartupApi.getAccountInfo(params)
    console.log(tmp)
    this.getAccountInfo = tmp.data
  }
  @action setCitizenId = (id) => {
    this.citizenId = id
  }
  @action setAccountId = (id) => {
    this.accountId = id
  }
}
export default CustomerServicesMenuStore
