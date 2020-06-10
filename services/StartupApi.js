import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './structor-01/Header'
import getGeneralApiProblem from './structor-01/ErrorHandler'

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

}
export default new StartupApi()