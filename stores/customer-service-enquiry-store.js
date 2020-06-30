// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { CustomerServicesEnquiryApi } from '../services'
import { create, persist } from 'mobx-persist'

class CustomerServiceEnquiry {
  @observable rowDataObject = null
  @observable tmpListData = null

  @observable fetchingGetListCustomerService = null
  @observable dataGetListCustomerService = null
  @observable errorGetListCustomerService = null

  @persist @observable persistRow = null

  @action setListData = (data) => {
    this.tmpListData = data
  }

  @action setTmpEnquiryRow = (data) => {
    this.rowDataObject = data
  }

  @action getListCustomerServicesEnquiry = async (params) => {
    this.fetchingGetListCustomerService = true
    let temp = await CustomerServicesEnquiryApi.getListCustomerServiceEnquiry(params)
    console.log("================== Response getListCustomerService ===================")
    console.log(temp)
    if (temp.ok) {
      this.fetchingGetListCustomerService = false
      this.dataGetListCustomerService = temp.data.responseData.transactions && temp.data.responseData.transactions.length > 0 ? temp.data.responseData.transactions : []
      this.errorGetListCustomerService = null
    } else {
      this.fetchingGetListCustomerService = false
      this.errorGetListCustomerService = get(temp, 'data.developerMessage', 'Unknown Error')
    }
  }

}
export default CustomerServiceEnquiry

