// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { CustomerServicesEnquiryApi } from '../services'
import { create, persist } from 'mobx-persist'

class CustomerServiceEnquiry {
  @observable rowDataObject = null
  @observable tmpListData = null
  @observable pageCustomerEnquiryTable = 1

  @observable fetchingGetListCustomerService = null
  @observable dataGetListCustomerService = null
  @observable errorGetListCustomerService = null

  @observable customer_data = null
  @observable onboarded_services = null

  @persist @observable persistRow = null

  @action setPageCustomerEnquiry = (page) => {
    this.pageCustomerEnquiryTable = page
  }

  @action clearCacheCustomerDetail = () => {
    this.customer_data = null
    this.onboarded_services = null
  }

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
        this.customer_data = JSON.parse(JSON.stringify(temp.data.responseData.customer))
        this.onboarded_services = JSON.parse(JSON.stringify(temp.data.responseData.onboarded_services))
        let addNoData = tmp_data.map((e, i) => {
          let tmp = JSON.parse(JSON.stringify(e))
          e.no = i + 1
          e.key = i + 1
          if (e.transaction_type == "TOPUP") {
            e.product_type = tmp.sender_product_type
            e.account_no = tmp.sender_main_account_value
            e.mobile_no = tmp.sender_proxy_value
            e.tcrb_account_reference = tmp.sender_main_account_value
            e.sub_account = tmp.sender_sub_account_value
            e.account_name = tmp.sender_name
            e.transaction_sub_type = "faeob9s990"
          }
          else if (e.transaction_type == "RPYMNT") {
            e.product_type = tmp.receiver_product_type
            e.account_no = tmp.receiver_main_account_value
            e.mobile_no = tmp.receiver_proxy_value
            e.tcrb_account_reference = tmp.receiver_main_account_value
            e.sub_account = tmp.receiver_sub_account_value
            e.account_name = tmp.receiver_name
            e.transaction_sub_type = "bfaeob9s990"
          }
          else {
            e.product_type = tmp.receiver_product_type ? tmp.receiver_product_type : tmp.sender_product_type
            e.account_no = tmp.receiver_main_account_value ? tmp.receiver_main_account_value : tmp.sender_main_account_value
            e.mobile_no = tmp.receiver_proxy_value ? tmp.receiver_proxy_value : tmp.sender_proxy_value
            e.tcrb_account_reference = tmp.receiver_main_account_value ? tmp.receiver_main_account_value : tmp.sender_main_account_value
            e.sub_account = tmp.receiver_sub_account_value ? tmp.receiver_sub_account_value : tmp.sender_sub_account_value
            e.account_name = tmp.receiver_name ? tmp.receiver_name : tmp.sender_name
            e.transaction_sub_type = "bfaeob9s990"
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
      this.dataGetListCustomerService = []
      this.errorGetListCustomerService = { error: temp.problem, status: temp.status }
      // this.errorGetListCustomerService = get(temp, 'data.developerMessage', 'Unknown Error')
    }
  }

}
export default CustomerServiceEnquiry

