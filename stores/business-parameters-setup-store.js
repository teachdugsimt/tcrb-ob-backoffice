// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { BusinessParameterSetupApi } from '../services'
import { create, persist } from 'mobx-persist'

class BusinessParameterSetup {
  @observable
  editOtpMaximumRetry = null
  @observable
  editOtpExpirationPeriod = null

  @observable
  responseGetOtpValue = null
  @observable
  fetchingGetOtp = null
  @observable
  errorGetOtp = null

  @observable
  responseUpdateOtp = null
  @observable
  fetchingUpdateOtp = null
  @observable
  errorUpdateOtp = null

  @observable
  requestAxios = null
  @observable
  dataAxios = null
  @observable
  errorAxios = null

  @observable pendingApprovals = []
  @observable fetchingApi = false
  @observable productLimit = []
  @observable productLimitDetail = null

  @persist @observable
  persist_value = null
  @action
  setPersistValue = (val) => {
    this.persist_value = val
  }

  @action
  closeExpire = (val) => {
    this.editOtpExpirationPeriod = val
  }

  @action
  closeMaximum = (val) => {
    this.editOtpMaximumRetry = val
  }

  @action getOTPdata = async (params) => {
    this.fetchingGetOtp = true
    let tmp = await BusinessParameterSetupApi.getOtpValue(params)
    if (tmp.ok == true && tmp.status == 200) {
      let raw_Data = toJS(tmp.data.responseData.paramStoreData)
      console.log("On Success : ", raw_Data)
      this.fetchingGetOtp = false
      this.errorGetOtp = null
      this.responseGetOtpValue = raw_Data
    } else {
      console.log("= Call get otp failure = ", tmp)
      this.fetchingGetOtp = false
      this.responseGetOtpValue = null
      this.errorGetOtp = tmp.problem
    }
  }

  @action
  updateOTPdata = async (params) => {
    this.fetchingUpdateOtp = true
    let response = await BusinessParameterSetupApi.setOtpValue(params)
    if (response.ok && response.status == 200) {
      console.log("Update OTP Success :: ", response)
      this.responseUpdateOtp = response.data
      this.fetchingUpdateOtp = false
      this.errorUpdateOtp = null
    } else {
      console.log("Update OTP FAIL :: ", response)
      this.fetchingUpdateOtp = false
      this.responseUpdateOtp = null
      this.errorUpdateOtp = response.problem ? response.problem : "Client Error"
    }
  }

  @action setCitizenId = (id) => {
    this.citizenId = { idCard: id }
  }
  @action setAccountId = (id) => {
    this.accountId = id
  }

  @action
  selectProductToDelete(productSelected) {
    console.log(toJS(productSelected))
    // [{
    //   id: 1, key: 1, ticket: "PAR0000001", requestType: "OTP Max Retrying", requestDescription: "Change from 3 to 5", requestId: "T630213",
    //   requestDate: "21-May-2020", action: null
    // }]
    productSelected.ticket = '00000' + this.pendingApprovals.length + 1
    productSelected.requestDescription = productSelected.ProductDescription
    this.pendingApprovals.push(productSelected)
  }

  @action
  getDataProductLimit = async () => {
    this.fetchingUpdateOtp = true
    let response = await BusinessParameterSetupApi.getProductLimit({ partner_code: '' })
    console.log(response)
    if (response.ok && response.status == 200) {
      this.productLimit = response.data.responseData
    } else {

    }
  }

  @action
  getDataByAxios = async (params) => {
    this.requestAxios = true
    let response = await BusinessParameterSetupApi.getOtpValueAxios(params)
    console.log("Axios OTP :: ", JSON.parse(JSON.stringify(response)))
    if (response.status == 200) {
      this.requestAxios = false
      this.dataAxios = JSON.parse(JSON.stringify(response))
    } else {
      this.requestAxios = false
      this.errorAxios = JSON.parse(JSON.stringify(response))
    }

    submitPartnerLimit = async () => {
      this.fetchingApi = true
      let response = await BusinessParameterSetupApi.submitPartnerLimit()
    }
    // @computed
    // get doubleCount() {
    //   return this.count * 2
    // }
  }
}
export default BusinessParameterSetup
