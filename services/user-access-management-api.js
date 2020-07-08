import ExcuteApi from './api-integrations/excute-api'
class UserAccessManagementApi {
  //'api/backoffice/v1/xxxx/xxxx' -> end point syntax
  getDepartment = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/departments', params, "get")
    return response
  }

  getDepartmentDetail = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }

  getSectionInDepartment = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }

  getSectionDetailInDepartment = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }

  getGroup = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }

  getGroupDetail = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }

  getUserInGroup = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }

  getUserDetailInGroup = async (params) => {
    const response = await ExcuteApi('end point', params, "get")
    return response
  }
}
export default new UserAccessManagementApi()
