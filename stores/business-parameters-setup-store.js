// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { BusinessParameterSetupApi } from '../services'
import { create, persist } from 'mobx-persist'

class BusinessParameterSetup {
  @observable editOtpMaximumRetry = null
  @observable editOtpExpirationPeriod = null

  @observable responseGetOtpValue = null
  @observable fetchingGetOtp = null
  @observable errorGetOtp = null

  @observable responseUpdateOtp = null
  @observable fetchingUpdateOtp = null
  @observable errorUpdateOtp = null

  @observable responseGetPendingApproveList = null
  @observable requestGetPendingApproveList = null
  @observable errorGetPendingApproveList = null

  @observable responseProcessPendingList = null
  @observable requestProcessPendingList = null
  @observable errorProcessPendingList = null
  @observable tmpPendingListID = null

  @observable pendingApprovals = []
  @observable fetchingApi = false
  @observable productLimit = []
  @observable productLimitDetail = null
  @observable arrayProductLimit = []
  @observable channelPartnerList = []
  @observable productList = []
  @observable productSelect = null

  @persist @observable persist_value = null

  updatePendingList = () => {
    if (this.tmpPendingListID && this.responseProcessPendingList) {
      let old_id = JSON.parse(JSON.stringify(this.tmpPendingListID))
      let old_list = JSON.parse(JSON.stringify(this.responseGetPendingApproveList))
      old_list.map((e, i) => {
        if (old_id == e.id) {
          old_list.splice(i, 1)
        }
      })
      this.responseGetPendingApproveList = old_list
    }
  }

  @action setTmpPendingListID = (id) => {
    this.tmpPendingListID = id
  }

  @action processPendingListApprove = async (params) => {
    this.requestProcessPendingList = true
    let tmp = await BusinessParameterSetupApi.processPendingList(params)
    console.log("Response process Pending Approve APISAUCE : ", tmp)
    if (tmp.ok) {
      this.requestProcessPendingList = false
      this.errorProcessPendingList = null
      this.responseProcessPendingList = tmp.ok
      this.updatePendingList()
      this.tmpPendingListID = null
    } else {
      this.requestProcessPendingList = false
      this.responseProcessPendingList = null
      this.errorProcessPendingList = tmp.problem
      this.tmpPendingListID = null
    }
  }

  @action getPendingApprove = async (params) => {
    this.requestGetPendingApproveList = true
    let tmp = await BusinessParameterSetupApi.getPendingApproveList(params)
    console.log("Response get Pending Approve APISAUCE : ", tmp)
    if (tmp.ok == true) {
      let raw_Data = toJS(tmp.data.responseData)
      this.requestGetPendingApproveList = false
      this.errorGetPendingApproveList = null
      this.responseGetPendingApproveList = raw_Data
    } else {
      this.requestGetPendingApproveList = false
      this.responseGetPendingApproveList = null
      this.errorGetPendingApproveList = tmp.problem
    }
  }

  @action setPersistValue = (val) => {
    this.persist_value = val
  }

  @action closeExpire = (val) => {
    this.editOtpExpirationPeriod = val
  }

  @action closeMaximum = (val) => {
    this.editOtpMaximumRetry = val
  }

  @action getOTPdata = async (params) => {
    this.fetchingGetOtp = true
    let tmp = await BusinessParameterSetupApi.getOtpValue(params)
    console.log("Response get otp APISAUCE : ", tmp)
    if (tmp.ok == true) {
      let raw_Data = toJS(tmp.data.responseData.paramStoreData)
      this.fetchingGetOtp = false
      this.errorGetOtp = null
      this.responseGetOtpValue = raw_Data
    } else {
      this.fetchingGetOtp = false
      this.responseGetOtpValue = null
      this.errorGetOtp = tmp.problem
    }
  }

  @action
  updateOTPdata = async (params) => {
    this.fetchingUpdateOtp = true
    let response = await BusinessParameterSetupApi.setOtpValue(params)
    if (response.ok) {
      console.log("Update OTP Success :: ", response)
      console.log("DATA >>", response.data)
      this.responseUpdateOtp = response.data
      this.fetchingUpdateOtp = false
      this.errorUpdateOtp = null
    } else {
      console.log("Update OTP FAIL :: ", response)
      this.fetchingUpdateOtp = false
      this.responseUpdateOtp = response.data
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
  getDataDetailProductLimit = async (params) => {
    this.fetchingUpdateOtp = true
    let response = await BusinessParameterSetupApi.getDetailProductLimit(params)
    console.log(response)
    if (response.ok && response.status == 200) {
      this.productLimitDetail = response.data.responseData
    } else {

    }
  }

  @action
  getDataChannelPartnerList = async () => {
    let response = await BusinessParameterSetupApi.getChannelPartnerList({ filter: { attributes: ["partner_code", "partner_abbreviation"] } })
    if (response.ok && response.status == 200) {
      this.channelPartnerList = response.data.responseData
    } else {

    }
  }

  @action getDataProductList = async () => {
    let response = await BusinessParameterSetupApi.getProductList({ filter: {} })
    if (response.ok && response.status == 200) {
      this.productList = response.data.responseData
    } else {

    }
  }

  @action
  deleteProductLimit = async (params) => {
    let response = await BusinessParameterSetupApi.deleteProductLimit({ action: "Delete", maker_id: "", currentData: params, newData: {} })
    console.log(response)
  }

  @action
  addNewProductLimit = async (params) => {
    let response = await BusinessParameterSetupApi.addNewProductLimit({ action: "Add", maker_id: "", currentData: {}, newData: params })
    console.log(response)
  }
  @action addSpecificLimit = async (params) => {
    let response = await BusinessParameterSetupApi.submitSpecificLimit({ action: "Add", maker_id: "", currentData: {}, newData: params })
    console.log(response)
  }

  @action changeProductLimit = async (params) => {
    let response = await BusinessParameterSetupApi.submitChangePartnerLimit({ action: "Update", maker_id: "", currentData: {}, newData: params })
    console.log(response)
  }
}
export default BusinessParameterSetup
