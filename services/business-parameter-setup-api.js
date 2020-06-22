import { ApisauceInstance, create, ApiResponse } from 'apisauce'
// import Header from './api-integrations/header-otp'
import header from './api-integrations/header'
import getGeneralApiProblem from './api-integrations/error-handler'
// v1/parameterstore
class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const api = create(header)
    const response = await api.get('api/backoffice/v1/parameterstore', params)
    return response
  }

  setOtpValue = async (params) => {
    const api = create(header)
    const response = await api.put('api/backoffice/v1/parameterstore', params)
    return response
  }

  getProductLimit = async (params) => {
    const api = create(header)
    const response = await api.get('api/backoffice/v1/partnertransactionlimit', params)
    return response
  }

  getPartnerChannel = async (params) => {
    const api = create(header)
    const response = await api.get('api/backoffice/v1/partnertransactionlimit', params)
    return response
  }
  submitPartnerLimit = async (params) => {
    const api = create(header)

  }

}
export default new BusinessParameterSetupApi()
