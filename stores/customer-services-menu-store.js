import { observable, action } from 'mobx'
import { StartupApi } from '../services'
import getGeneralApiProblem from '../services/api-integrations/ErrorHandler'

class CustomerServicesMenuStore {
  @observable citizenId = ''
  @observable accountId = {}
  @observable accountSelected = {}
  @observable accountInfoFetching = false
  @observable accountInfo = []
  @observable arrayAccountInfo = []
  @observable accountInfoError = {}

  @action getData = async (citizenId) => {
    this.citizenId = { idCard: citizenId }
    this.accountInfoFetching = true
    let tmp = await StartupApi.getAccountInfo(this.citizenId)
    // this.accountInfo = tmp
    if (tmp.ok && tmp.data.statusCode === 200) {
      this.accountInfoFetching = false
      this.accountInfo = tmp.data
    } else {
      this.accountInfoFetching = false
      console.log(JSON.parse(tmp.data.body))
      // let problem = getGeneralApiProblem(response)
      this.accountInfoError = JSON.parse(tmp.data.body)
    }
  }
  @action setCitizenId = (id) => {
    this.citizenId = { idCard: id }
  }
  @action setAccountId = (id) => {
    this.accountId = id
  }
}
export default CustomerServicesMenuStore
