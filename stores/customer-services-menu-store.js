import { observable, action, toJS } from 'mobx'
import { CustomerServicesMenuApi } from '../services'
import { get } from 'lodash'

class CustomerServicesMenuStore {
  @observable citizenId = ''
  @observable accountId = {}
  @observable accountSelected = {}
  @observable apiFetching = false

  @observable accountInfo = null
  @observable accountSuccessInfo = null
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
    this.apiFetching = true
    let temp = await CustomerServicesMenuApi.getAccountInfo(this.citizenId)
    console.log(temp)
    if (temp.ok && temp.status === 200) {
      this.apiFetching = false
      console.log("Response >> ", temp.data.responseData)
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
        this.apiFetching = false
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
    this.accountSuccessInfo = null
    let temp = await CustomerServicesMenuApi.unlockOTPAccount({ main_account_no, cif })
    console.log(temp)
    if (temp.ok && temp.status === 200) {
      this.apiFetching = false
      this.unlockOtpInfo = temp.data.responseData
      this.accountSuccessInfo = this.accountSelected
      this.accountInfoError = null
    } else {
      this.apiFetching = false
      this.accountInfoError = get(temp, 'data.developerMessage', 'Unknown Error')
      // this.unlockOtpError = JSON.parse(temp.data.body)
    }
  }

  @action getDataAccountUnbind = async (accountNumber) => {
    this.citizenId = { citizen_id: accountNumber }
    this.apiFetching = true
    let temp = await CustomerServicesMenuApi.getAccountInfoUnbinding(this.citizenId)
    console.log(temp)
    if (temp.ok && temp.status === 200) {
      this.apiFetching = false
      this.accountInfo = temp.data.responseData
      this.accountInfoError = null
    } else {
      this.apiFetching = false
      // let problem = getGeneralApiProblem(response)
      // this.accountInfoError = JSON.parse(temp.data.body)

      this.accountInfoError = get(temp, 'data.developerMessage', 'Unknown Error')
    }
  }

  @action getDataPartnerInfo = async (accountNumber) => {
    this.apiFetching = true

    let temp = await CustomerServicesMenuApi.getPartnerInfo({ main_account_no: accountNumber })
    console.log(temp)
    if (temp.ok && temp.status === 200 && !temp.problem) { //change to status when real api
      this.apiFetching = false
      this.unbindAccountInfo = temp.data.responseData
      // this.unbindAccountInfo = temp.data.responseData // for dev
    } else {
      this.apiFetching = false
      this.unbindAccountInfo = temp
      this.accountInfoError = get(temp, 'data.developerMessage', 'Unknown Error')

    }
  }

  @action submitAccountUnbiding = async () => {
    // accountRefId: accountRefId,
    //         partnerRefId: partnerRefId,
    //         requestId: requestId,
    //         transactionRefNo: transactionRefNo
    this.apiFetching = true
    let { account_reference, partner_reference } = this.accountSelected
    let requestId = "1234567890"
    let transactionRefNo = "1234567890"
    console.log("DATA >> ", { account_reference, partner_reference, requestId, transactionRefNo })
    let temp = await CustomerServicesMenuApi.unbindAccount({
      accountRefId: account_reference,
      partnerRefId: partner_reference,
      requestId, transactionRefNo
    })
    console.log(temp)
    if (temp.ok && temp.status === 200) {
      this.apiFetching = false
      // this.unlockOtpInfo = temp.data
      // console.log(this.accountSelected)
      // console.log(this.unbindAccountInfo)
      this.unbindAccountInfo = this.unbindAccountInfo.filter(e => e.partner_reference != this.accountSelected.partner_reference)
      this.accountSelected = null
      // console.log(this.unbindAccountInfo)
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
