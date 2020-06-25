import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './api-integrations/header'
import getGeneralApiProblem from './api-integrations/error-handler'
import https from 'https';
import axios from 'axios'
import ExcuteApi from './api-integrations/excute-api'

class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/parameterstore', params, "get")
    return response
  }

  setOtpValue = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/otp', params, "post")
    return response
  }

  getPendingApproveList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get")
    return response
  }

  getProductLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnertransactionlimit', params, "get")
    return response
  }

  getPartnerChannel = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnertransactionlimit', params, "get")
    return response
  }

  processPendingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/' + params.id, params, "patch")
    return response
  }

}
export default new BusinessParameterSetupApi()
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev


// customer service inquiry
// bussiness parameter setup
// customer service menu
