import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/header'
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

  getOtpValueAxios = async (params) => {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      requestCert: false,
    })
    console.log("HTTPS AGENT : ", httpsAgent)
    const response = await axios({
      url: 'https://dwl8p0fxml-vpce-03ae60b10934425db.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/parameterstore',
      // url: 'https://api-dev.onlinebanking-backoffice.com/api/backoffice/v1/parameterstore',
      method: 'GET',
      params,
      responseType: 'json',
      httpsAgent,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

        // 'Access-Control-Allow-Origin': "*",
        'x-apigw-api-id': "dwl8p0fxml",
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS

        // 'x-api-language': "TH",
        // 'x-api-key': '',
        // 'x-api-signature': 'a94ks02304ldfgkorm1234llgdmfk',
        // 'uuid': 'YYYYYYYY',
      },
      timeout: 15000
    }).then(data => {
      console.log("AXIOS CALLLL : ", data)
      return data
    }).catch(err => {
      console.log("AXIOS ERROR : ", err)
      return err
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
