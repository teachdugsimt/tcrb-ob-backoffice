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

}
export default new PartnerOnboardApi()
