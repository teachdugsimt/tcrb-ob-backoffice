import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/Header'
import getGeneralApiProblem from './api-integrations/ErrorHandler'

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
    console.log(response)
    return response

    // get-account-product-by-citizenid
    // https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/otp/blacklist
    // if (response.ok) {
    //   return response.data
    // } else {
    //   let problem = getGeneralApiProblem(response)
    //   return problem
    // }

  }
}
export default new StartupApi()
