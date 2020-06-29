import ExcuteApi from './api-integrations/excute-api'

class PendingApprovalApi {
  getPendingApproveList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get")
    return response
  }

  getPendingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get")
    return response
  }

  processPendingList = async (params) => {
    const response = await ExcuteApi(`api/backoffice/v1/changerequest/${params.id}/confirm`, params, "post")
    return response
  }

}
export default new PendingApprovalApi()

