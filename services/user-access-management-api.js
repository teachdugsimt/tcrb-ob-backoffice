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

  getGroupDetail = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/groups/' + params, null, "get")
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

  getFunction = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/functions', params, "get")
    return response
  }

  getMenu = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/menus', params, "get")
    return response
  }

  getGroup = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/groups', params, "get")
    return response
  }

  getUser = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/userprofiles', params, "get")
    return response
  }

  getUserDetail = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/userprofiles/' + params, null, "get")
    return response
  }

  getSupervisor = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/userprofiles', params, "get")
    return response
  }

  getRole = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/roles', params, "get")
    return response
  }

  getMatrix = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/maprolesfunctions', params, "get")
    return response
  }

  getSection = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/sections', params, "get")
    return response
  }

  addNewDepartment = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addNewSection = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addNewFunction = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addNewRole = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addNewUser = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addNewGroup = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addFunctionToMenu = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  addGroupToUser = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  updateDepartment = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  updateSection = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  updateFunction = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  updateMenu = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  updateRole = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  updateUser = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  deleteDepartment = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  deleteFunction = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  deleteMenu = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  deleteRole = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  deleteGroupInUser = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

  deleteUserInGroup = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post")
    return response
  }

}
export default new UserAccessManagementApi()
