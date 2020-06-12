import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/Header'
import getGeneralApiProblem from './api-integrations/ErrorHandler'

class StartupApi {

    createProcess = async (params) => {
        const api = create(Header)
        const response = await api.post('v1/calculator/calculate', params)
        if (response.ok) {
            console.log("Fetch value api test : ", response)
            return response.data
        } else {
            console.log("Error fetching api test : ", response)
            let problem = getGeneralApiProblem(response)
            return problem
        }
    }

}
export default new StartupApi()
