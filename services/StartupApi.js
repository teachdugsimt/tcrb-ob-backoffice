import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/Header'
import getGeneralApiProblem from './api-integrations/ErrorHandler'

class StartupApi {

  createProcess = async (params) => {
    const api = create(Header)
    const response = await api.post('v1/calculator/calculate', params)
    if (response.ok) {
      console.log("Fetch value : ", response)
      return response.data
    } else {
      console.log("Error fetchinh : ", response)
      let problem = getGeneralApiProblem(response)
      return problem
    }
  }
  getAccountInfo = async (params) => {
    const api = create(Header)
    const response = await api.get('api/get-account-product-by-citizenid', { idCard: '2222222222' })
    if (response.ok) {
      console.log("Fetch value : ", response)
      return response.data
    } else {
      console.log("Error fetchinh : ", response)
      let problem = getGeneralApiProblem(response)
      return problem
    }

  }

}
export default new StartupApi()
