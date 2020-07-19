import ExcuteApi from './api-integrations/excute-api'

class PendingApprovalApi {
  getPendingApproveList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  getPendingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  processPendingList = async (params) => {
    const response = await ExcuteApi(`api/backoffice/v1/changerequest/${params.id}/confirm`, params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }

}
export default new PendingApprovalApi()

