import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/header'
import getGeneralApiProblem from './api-integrations/error-handler'
import https from 'https';
import axios from 'axios'

class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const api = create(Header())
    const response = await api.get('api/backoffice/v1/parameterstore', params)
    // console.log("response get OTP  :  ", response)
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

  getOtpValueAxios = async (params) => {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      requestCert: false,
    })
    console.log("Param before call : ", params)
    // const response = await axios.get("https://api-dev.onlinebanking-backoffice.com/api/backoffice/v1/parameterstore", {
    const response = await axios.get("https://dwl8p0fxml-vpce-03ae60b10934425db.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/parameterstore", {
      params,
      httpsAgent,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'x-apigw-api-id': 'dwl8p0fxml',

        // 'X-Forwarded-Proto': 'https',
        // 'x-amzn-vpce-id': 'vpce-03ae60b10934425db',
        // 'x-amzn-vpc-id': 'vpc-024c7d2df440a6d46',
        // 'X-Forwarded-Port': '443'
      }
    })
    return response
  }

  getPartnerChannel = async (params) => {
    const api = create(header)
    const response = await api.get('api/backoffice/v1/partnertransactionlimit', params)
    return response
  }

  // submitPartnerLimit = async (params) => {
  //   const api = create(header)
  // }

}
export default new BusinessParameterSetupApi()
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev
