// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { BusinessParameterSetupApi } from '../services'

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

  @observable pendingApprovals = []

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
      console.log("Update OTP Success :: ", resopnse)
      this.responseUpdateOtp = response.data
      this.fetchingUpdateOtp = false
      this.errorUpdateOtp = null
    } else {
      console.log("Update OTP FAIL :: ", response)
      this.fetchingUpdateOtp = false
      this.responseUpdateOtp = null
      this.errorUpdateOtp = resopnse.problem
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
    productSelected.ticket = '00000' + this.pendingApprovals.length + 1
    productSelected.requestType = productSelected.ProductDescription
    this.pendingApprovals.push(productSelected)
  }
  // @computed
  // get doubleCount() {
  //   return this.count * 2
  // }
}
export default BusinessParameterSetup
