import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/header'
import ExcuteApi from './api-integrations/excute-api'

class CustomerServicesMenuApi {

  getAccountInfo = async (params) => {
    // const api = create(Header())
    // const response = await api.get('api/backoffice/v1/otp/blacklist', params)
    const response = await ExcuteApi('api/backoffice/v1/otp/blacklist', params, "get")
    return response
  }

  getAccountInfoUnbinding = async (params) => {
    // const api = create(Header())
    // const response = await api.get('api/backoffice/v1/accounts', params)
    const response = await ExcuteApi('api/backoffice/v1/accounts', params, "get")
    return response
  }

  getAccountProductsInfo = async (params) => {
    // const api = create(Header())
    // const response = await api.get('api/backoffice/v1/accounts/partner-info', params)
    const response = await ExcuteApi('api/backoffice/v1/accounts/partner-info', params, "get")
    return response
  }

  unlockOTPAccount = async (params) => {
    // const api = create(Header())
    // const response = await api.post('api/backoffice/v1/otp/unlock', params)
    const response = await ExcuteApi('api/backoffice/v1/otp/unlock', params, "post")
    return response
  }

  unbindAccount = async (params) => {
    // const api = create(Header())
    // const response = await api.post('api/accounts/unbind', params)
    const response = await ExcuteApi('api/accounts/unbind', params, "post")
    return response
  }
}
export default new CustomerServicesMenuApi()
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev
