import { observable, action, computed } from "mobx"
import { create, persist } from 'mobx-persist'
import { PartnerOnboardApi } from '../services'
import { openModalError } from '../components/data-utility'
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

  @observable data_get_partnerinformation_by_id = null
  @observable error_get_partnerinformation_by_id = null

  @observable data_getPartnerServiceInformationById = null
  @observable error_getPartnerServiceInformationById = null

  @observable partnerProductList = []
  @observable partnerServiceList = []

  @observable data_partner_product_code_dropdown = null

  @observable data_getProductServicesDropdown = null

  @observable data_addNewPartnerService = null

  @observable data_addNewPrincipalFee = null

  @observable data_deRegisterPartner = null

  @observable tmp_partner_id = null // partner_code
  @observable tmp_partner_real_id = null  // id of list
  @observable tmp_product_code = null  // product_code
  @observable tmp_product_type = null  // product_type
  @observable tmp_service_name = null // service_name
  @observable tmp_principal_gl = null // form in principal screen
  @observable tmp_fee = null // form in fee screen
  @observable tmp_obj_partner = null // obj contain all attributes

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
      //when error
      let errorMessage = {
        title: (
          'getPartnerOnboard, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
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
      //when error
      let errorMessage = {
        title: (
          'addPartnerOnboard, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }

  @action
  async getProvince(params) {
    this.fetching_onboard = true
    let parameters = params ? params : { filter: {} }
    const tmp = await PartnerOnboardApi.getProvince(parameters)
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
      let errorMessage = {
        title: (
          'getProvince, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }

  @action
  async getDistrict(params) {
    this.fetching_onboard = true
    let parameters = params ? params : { filter: {} }
    const tmp = await PartnerOnboardApi.getDistrict(parameters)
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
      let errorMessage = {
        title: (
          'getDistrict, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }

  @action
  async getSubDistrict(params) {
    this.fetching_onboard = true
    let parameters = params ? params : { filter: {} }
    const tmp = await PartnerOnboardApi.getSubDistrict(parameters)
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
      let errorMessage = {
        title: (
          'getSubDistrict, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }














  @action async setPartnerId(params) {  // partner_code
    this.tmp_partner_id = params
  }
  @action async setPartnerRealId(params) {  // id of list
    this.tmp_partner_real_id = params
  }
  @action async getDataPartnerProductList(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.getPartnerProductList({
      filter: {
        where: {
          partner_code: params
        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.partnerProductList = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'getDataPartnerProductList, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }
  @action async deletePartnerProduct(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.deletePartnerProduct({
      change_type: "PARTNER_PRODUCTS",
      action: "Delete", currentData: params,
      newData: {}, maker_id: '36'
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.partnerProductList = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'deletePartnerProduct, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }
  @action
  async getPartnerInformationById(params, id) {
    this.fetching_onboard = true
    let parameter = {
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
    const tmp = await PartnerOnboardApi.getPartnerInformationsByID(parameter, id)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_get_partnerinformation_by_id = tmp.data.responseData
      this.error_get_partnerinformation_by_id = null
    } else {
      //when error
      this.fetching_onboard = false
      this.error_get_partnerinformation_by_id = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_get_partnerinformation_by_id = null
      //when error
      let errorMessage = {
        title: (
          'getPartnerInformationById, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }







  //Dropdown Select Product partner
  @action async getDataPartnerProductDropdown(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.getPartnerProductCode({
      filter: {
        where: {
          product_code: {
            $notIn: [...params]
          }
        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_partner_product_code_dropdown = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'getDataPartnerProductDropdown, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }
  @action async submitAddNewPartnerProduct(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addNewPartnerProduct({ change_type: "PARTNER_PRODUCTS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'submitAddNewPartnerProduct, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }











  // Partner Service of product
  @action async setProductCode(params) {
    this.tmp_product_code = params
  }
  @action async setProductType(params) {
    this.tmp_product_type = params
  }
  @action async setServiceName(params) {
    this.tmp_service_name = params
  }
  @action async getDataPartnerProductService(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.getPartnerProductService({
      filter: {
        where: {
          partner_code: params.partner_code,
          product_code: params.product_code
        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.partnerServiceList = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'getDataPartnerProductService, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }
  @action async getListServiceInformationById(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.getPartnerServiceInformationById({
      filter: {
        where: {
          product_code: params.product_code
        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_getPartnerServiceInformationById = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'getListServiceInformationById, ' + ' Error Code ' + tmp.problem ? tmp.problem : tmp.data && tmp.data.responseCode && tmp.data.responseCode != null ? tmp.data.responseCode : ""
        ),
        body: (
          <div>
            <p>{tmp.data && tmp.data.userMessage && tmp.data.userMessage ? tmp.data.userMessage : tmp.problem}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }
  @action async getProductServicesDropdown(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.getProductServicesDropdownPartnerServiceScreen({
      filter: {
        where: {
          product_code: params.product_code
        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_getProductServicesDropdown = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'getProductServicesDropdown, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }
  @action async addNewPartnerService(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addNewPartnerService({ change_type: "PARTNER_SERVICES", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_addNewPartnerService = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'addNewPartnerService, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }


  // fee screen zone
  @action setTmpForm(params, type) {
    if (type == 'principal') {
      this.tmp_principal_gl = params
    } else if (type == 'fee') {
      this.tmp_fee = params
    }
  }
  @action setObjTmpPartner(params) {
    this.tmp_obj_partner = params
  }
  @action async addNewPrincipalFee(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.addNewPrincipalFee({ change_type: "FEES", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_addNewPrincipalFee = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'addNewPrincipalFee, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }


  @action async deRegisterPartnerRequest(params) {
    this.fetching_onboard = true
    const tmp = await PartnerOnboardApi.deRegisterPartner({ change_type: "PARTNER_INFORMATIONS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_onboard = false
      this.data_deRegisterPartner = tmp.data.responseData
    } else {
      this.fetching_onboard = false

      //when error
      let errorMessage = {
        title: (
          'deRegisterPartnerRequest, ' + ' Error Code ' + tmp.data.responseCode
        ),
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }


}
export default PartnerOnboardStore
