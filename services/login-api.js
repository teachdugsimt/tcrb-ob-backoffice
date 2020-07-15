import ExcuteApi from './api-integrations/excute-api'
class LoginApi {
  //'api/backoffice/v1/xxxx/xxxx' -> end point syntax
  LoginApi = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/signin', params, "post")
    return response
  }

  LogoutApi = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/signout', params, "post")
    return response
  }

}
export default new LoginApi()
