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
}
export default new StartupApi()
