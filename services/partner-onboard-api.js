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

  addNewPartnerProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  getProvince = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  getDistrict = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  getSubDistrict = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  getPartnerProductList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnerproducts', params, "post")
    return response
  }

  getPartnerProductService = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnerservices', params, "post")
    return response
  }

  deletePartnerProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

}
export default new PartnerOnboardApi()
