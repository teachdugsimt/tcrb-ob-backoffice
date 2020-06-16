import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/Header'
import getGeneralApiProblem from './api-integrations/error-handler'

class StartupApi {

  createProcess = async (params) => {
    const api = create(Header)
    const response = await api.post('v1/calculator/calculate', params)
    if (response.ok) {
      return response.data
    } else {
      let problem = getGeneralApiProblem(response)
      return problem
    }
  }
  getAccountInfo = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/v1/otp/blacklist', params)
    return response
  }

  getAccountInfoUnbinding = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/v1/accounts', params)
    return response
  }

  getAccountProductsInfo = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/v1/accounts/partner-info', params)
    return response
  }

  unlockOTPAccount = async (params) => {
    const api = create(Header)
    const response = await api.post('api/backoffice/v1/otp/unlock', params)
    return response
  }

  unbindAccount = async (params) => {
    const api = create(Header)
    const response = await api.post('api/accounts/unbind', params)
    return response
  }
}
export default new StartupApi()
