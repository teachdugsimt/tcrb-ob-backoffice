import { ApisauceInstance, create, ApiResponse } from 'apisauce'
// import Header from './api-integrations/header-otp'
import Header from './api-integrations/Header'
import getGeneralApiProblem from './api-integrations/error-handler'
// v1/parameterstore
class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/parameterstore', params)
    return response
  }

  setOtpValue = async (params) => {
    const api = create(Header)
    const response = await api.put('api/backoffice/parameterstore', params)
    return response
  }

  getProductLimit = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/v1/partnertransactionlimit', params)
    return response
  }
}
export default new BusinessParameterSetupApi()
