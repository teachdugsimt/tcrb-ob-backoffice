import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/Header'
import getGeneralApiProblem from './api-integrations/error-handler'
import https from 'https';
import axios from 'axios'

class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const api = create(Header())
    console.log("header : ", Header())
    const response = await api.get('api/backoffice/v1/parameterstore', params)
    console.log("response get OTP  :  ", response)
    return response
  }

  setOtpValue = async (params) => {
    const api = create(Header())
    const response = await api.put('api/backoffice/v1/parameterstore', params)
    return response
  }

  getProductLimit = async (params) => {
    const api = create(Header())
    const response = await api.get('api/backoffice/v1/partnertransactionlimit', params)
    return response
  }

  // getOtpValueAxios = async (params) => {
  //   const httpsAgent = new https.Agent({
  //     rejectUnauthorized: false,
  //     requestCert: false,
  //   })
  //   const response = await axios({
  //     url: 'https://api-dev.onlinebanking-backoffice.com/api/backoffice/v1/parameterstore',
  //     method: 'get',
  //     params,
  //     responseType: 'json',
  //     httpsAgent,
  //     headers: {
  //       'x-apigw-api-id': "dwl8p0fxml"
  //     }
  //   }).then(data => {
  //     console.log("AXIOS CALLLL : ", data)
  //     return data
  //   })
  //   return response
  // }
}
export default new BusinessParameterSetupApi()
