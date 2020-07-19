import ExcuteApi from './api-integrations/excute-api'

class CustomerServicesEnquiryApi {
  getListCustomerServiceEnquiry = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/customerservice', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }
}
export default new CustomerServicesEnquiryApi()
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev
