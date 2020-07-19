import ExcuteApi from './api-integrations/excute-api'

class CustomerServicesMenuApi {

  getAccountInfo = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/otp/blacklist', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  getAccountInfoUnbinding = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/accounts', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  getPartnerInfo = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/accounts/partner-info', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  unlockOTPAccount = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/otp/unlock', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }

  unbindAccount = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/accounts/unbind', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }
}
export default new CustomerServicesMenuApi()
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev
