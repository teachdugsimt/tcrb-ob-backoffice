import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/header-otp'
import getGeneralApiProblem from './api-integrations/error-handler'
// v1/parameterstore
class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const api = create(Header)
    const response = await api.get('v1/parameterstore', params)
    return response
  }

  setOtpValue = async (params) => {
    const api = create(Header)
    const response = await api.put('v1/parameterstore', params)
    return response
  }
}
export default new BusinessParameterSetupApi()
