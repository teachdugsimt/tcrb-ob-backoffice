import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/header'
import getGeneralApiProblem from './api-integrations/error-handler'
import https from 'https';
import axios from 'axios'
import ExcuteApi from './api-integrations/excute-api'

class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    // const api = create(Header())
    const response = await ExcuteApi('api/backoffice/v1/parameterstore', params)
    // const response = await api.get('api/backoffice/v1/parameterstore', params)
    return response
  }

  setOtpValue = async (params) => {
    const api = create(Header())
    const response = await api.post('api/backoffice/v1/changerequest', params)
    return response
  }

  getProductLimit = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/v1/partnertransactionlimit', params)
    return response
  }

  deleteProductLimit = async (params) => {
    const api = create(Header)
    const response = await api.post('api/backoffice/v1/changerequest/productlimit', params)
    return response
  }

  getPendingList = async (params) => {
    const api = create(Header)
    const response = await api.get('api/backoffice/v1/changerequest', params)
    return response
  }

  approveRejectOtpRequest = async (params) => {
    const api = create(Header)
    const response = await api.put('api/backoffice/v1/changerequest/otp', params)
    return response
  }

  rejectRejectProductRequest = async (params) => {
    const api = create(Header)
    const response = await api.put('api/backoffice/v1/changerequest/productlimit', params)
    return response
  }

  getOtpValueAxios = async (params) => {
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      requestCert: false,
    })

    const response = await axios.get("https://dwl8p0fxml-vpce-03ae60b10934425db.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/parameterstore", {
      params,
      httpsAgent,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'x-apigw-api-id': 'dwl8p0fxml',

        // 'Access-Control-Allow-Origin': "*",
        'x-apigw-api-id': "dwl8p0fxml",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS

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


// customer service inquiry
// bussiness parameter setup
// customer service menu
