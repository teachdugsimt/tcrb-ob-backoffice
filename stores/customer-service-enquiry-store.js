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
      if (temp && temp.data && temp.data.responseData.transactions.length > 0) {
        let tmp_data = JSON.parse(JSON.stringify(temp.data.responseData.transactions))
        let addNoData = tmp_data.map((e, i) => {
          e.no = i + 1
          if (e.transaction_type == "TOPUP") {
            e.product_type = e.receiver_product_type
            e.account_no = e.sender_main_account_value
            e.mobile_no = e.sender_proxy_value
            e.tcrb_account_reference = e.sender_main_account_value
            e.sub_account = e.sender_sub_account_value
            e.account_name = e.sender_name
          }
          else if (e.transaction_type == "RPYMNT") {
            e.product_type = e.sender_product_type
            e.account_no = e.receiver_main_account_value
            e.mobile_no = e.receiver_proxy_value
            e.tcrb_account_reference = e.receiver_main_account_value
            e.sub_account = e.receiver_sub_account_value
            e.account_name = e.receiver_name
          }
          return e
        })
        this.dataGetListCustomerService = addNoData
      } else {
        this.dataGetListCustomerService = []
      }
      this.errorGetListCustomerService = null
    } else {
      this.fetchingGetListCustomerService = false
      this.errorGetListCustomerService = get(temp, 'data.developerMessage', 'Unknown Error')
    }
  }

}
export default CustomerServiceEnquiry

