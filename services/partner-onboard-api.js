import ExcuteApi from './api-integrations/excute-api'
class PartnerOnboardApi {
  //'api/backoffice/v1/xxxx/xxxx' -> end point syntax
  getPartnerOnboardInformation = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnerinformations', params, "get")
    return response
  }
  addPartnerOnboard = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }


  getProvince = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/address/provinces', params, "get")
    return response
  }
  getDistrict = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/address/districts', params, "get")
    return response
  }
  getSubDistrict = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/address/subdistricts', params, "get")
    return response
  }


  // Partner authorize Product Registration
  getPartnerProductList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnerproducts', params, "get")
    return response
  }
  deletePartnerProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }
  getPartnerInformationsByID = async (params, id) => {
    console.log("params : ", params)
    console.log("ID :: ", id)
    const response = await ExcuteApi('api/backoffice/v1/partnerinformations/' + id, params, "get")
    return response
  }
  deRegisterPartner = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }


  //Dropdown Select Product
  addNewPartnerProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }
  getPartnerProductCode = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/products', params, "get")
    return response
  }

  // ซ้ายล่างสุด เดะค่อยทำเพิ่ม Partner service product
  getPartnerProductService = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnerservices', params, "get")
    return response
  }
  getPartnerServiceInformationById = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/products', params, "get")
    return response
  }

  getProductServicesDropdownPartnerServiceScreen = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/productservices', params, "get")
    return response
  }
  addNewPartnerService = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }
  addNewPrincipalFee = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

}
export default new PartnerOnboardApi()
