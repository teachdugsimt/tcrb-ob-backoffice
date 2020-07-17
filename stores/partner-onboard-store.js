import { observable, action, computed } from "mobx"
import { create, persist } from 'mobx-persist'
import { PartnerOnboardApi } from '../services'
class PartnerOnboardStore {
  @persist @observable id = ""
  @persist @observable password = ""
  @observable select_modify = ""
  @action setPage = (page_name) => {
    this.select_modify = page_name
  }
  @observable fetching_onboard = null
  @observable data_partner_onboard = null
  @observable error_partner_onboard = null

  @observable data_add_partner_onboard = null
  @observable error_add_partner_onboard = null

  @observable data_get_province = null
  @observable error_get_province = null

  @observable data_get_district = null
  @observable error_get_district = null

  @observable data_get_sub_district = null
  @observable error_get_sub_district = null


  @action
  async getPartnerOnboard(params) {
    this.fetching_onboard = true
    let parameter = params ? params : {
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" }, { request_status: "PENDING" }
              ]
            }
          ]
        }
      }
    }
    const tmp = await PartnerOnboardApi.getPartnerOnboardInformation(parameter)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_partner_onboard = tmp.data.responseData
      this.error_partner_onboard = null
    } else {
      //when error
      this.fetching_onboard = false
      this.error_partner_onboard = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_partner_onboard = null
    }
  }

  @action
  async addPartnerOnboard(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addPartnerOnboard(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_add_partner_onboard = tmp.data.responseData
      this.error_add_partner_onboard = null
    } else {
      //when error
      this.fetching_onboard = false
      this.error_add_partner_onboard = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_add_partner_onboard = null
    }
  }

  @action
  async getProvince(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addPartnerOnboard(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_get_province = tmp.data.responseData
      this.error_get_province = null
    } else {
      //when error
      this.fetching_onboard = false
      this.error_get_province = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_get_province = null
    }
  }

  @action
  async getDistrict(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addPartnerOnboard(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_get_district = tmp.data.responseData
      this.error_get_district = null
    } else {
      //when error
      this.fetching_onboard = false
      this.error_get_district = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_get_district = null
    }
  }

  @action
  async getSubDistrict(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addPartnerOnboard(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_get_sub_district = tmp.data.responseData
      this.error_get_sub_district = null
    } else {
      //when error
      this.fetching_onboard = false
      this.error_get_sub_district = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_get_sub_district = null
    }
  }

}
export default PartnerOnboardStore
