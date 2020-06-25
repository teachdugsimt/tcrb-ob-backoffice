import { observable, action, toJS } from 'mobx'
import { CustomerServicesMenuApi } from '../services'
import { get } from 'lodash'

class CustomerServicesMenuStore {
  @observable citizenId = ''
  @observable accountId = {}
  @observable accountSelected = {}
  @observable apiFetching = false
  @observable searchFetching = false

  @observable accountInfo = null
  @observable arrayAccountInfo = []
  @observable accountInfoError = null

  @observable unlockOtpError = []
  @observable unlockOtpInfo = null
  @observable unbindAccountInfo = null
  @observable unbindAccountError = []
  @observable arrayUnbindAccountInfo = []

  @observable errorMessage = null

  @action getDataAccountOtpUnlock = async (citizenId) => {
    this.citizenId = { citizen_id: citizenId }
    this.searchFetching = true
    let temp = await CustomerServicesMenuApi.getAccountInfo(this.citizenId)
    console.log(temp)
    if (temp.ok && temp.status === 200) {
      this.searchFetching = false
      this.accountInfo = temp.data.responseData
      //waiting edit api
      // if (temp.responseData.data.name == 'Error') {
      //   this.accountInfoError = temp.data
      // }
    } else {
      if (temp.problem == 'TIMEOUT_ERROR') {
        this.customerServicesMenuStore.accountInfoError.responseData.userMessage = temp.originalError.message
        this.accountInfoError = null
      } else {
        this.searchFetching = false
        // this.accountInfoError = JSON.parse(temp.data.body)
        // console.log(temp.problem)
        // this.accountInfoError = temp.originalError.message
        this.accountInfoError = get(temp, 'data.developerMessage', 'Unknown Error')
      }

    }
  }

  @action submitUnlockOTP = async () => {
    // this.accountSelected
    let { main_account_no, cif } = this.accountSelected
    this.apiFetching = true
    let temp = await CustomerServicesMenuApi.unlockOTPAccount({ main_account_no, cif })
    console.log(temp)
    if (temp.ok && temp.data.statusCode === 200) {
      this.apiFetching = false
      this.unlockOtpInfo = temp.data.responseData
      this.accountInfoError = null
    } else {
      this.apiFetching = false
      this.accountInfoError = get(temp, 'data.developerMessage', 'Unknown Error')
      // this.unlockOtpError = JSON.parse(temp.data.body)
    }
  }

  @action getDataAccountUnbind = async (accountNumber) => {
    this.citizenId = { citizen_id: accountNumber }
    this.searchFetching = true
    let temp = await CustomerServicesMenuApi.getAccountInfoUnbinding(this.citizenId)
    console.log(temp)
    if (temp.ok && temp.status === 200) {
      this.searchFetching = false
      this.accountInfo = temp.data.responseData
      this.accountInfoError = null
    } else {
      this.searchFetching = false
      // let problem = getGeneralApiProblem(response)
      // this.accountInfoError = JSON.parse(temp.data.body)

      this.accountInfoError = get(temp, 'data.developerMessage', 'Unknown Error')
    }
  }

  @action getDataAccountProduct = async (accountNumber) => {
    this.apiFetching = true

    let temp = await CustomerServicesMenuApi.getAccountProductsInfo({ main_account_no: accountNumber })
    console.log(temp)
    if (temp.ok && temp.status === 200) { //change to status when real api
      this.apiFetching = false
      this.unbindAccountInfo = temp.data.responseData
      // this.unbindAccountInfo = temp.data.responseData // for dev
    } else {
      this.apiFetching = false

    }
  }

  @action submitAccountUnbiding = async () => {
    this.apiFetching = true
    let { main_account_no, sub_account_no, partner_code } = this.accountSelected
    let temp = await CustomerServicesMenuApi.unbindAccount({ main_account_no, sub_account_no, partner_code })
    if (temp.ok && temp.data.statusCode === 200) {
      this.apiFetching = false
      this.unlockOtpInfo = temp.data
    } else {
      this.apiFetching = false
      // this.unlockOtpError = JSON.parse(temp.data.body)
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
