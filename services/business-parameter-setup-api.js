import ExcuteApi from './api-integrations/excute-api'

class BusinessParameterSetupApi {

  getOtpValue = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/parameterstore', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  setOtpValue = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/otp', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }

  getPendingApproveList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  getProductList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/product', params, "get")
    return response
  }

  getProductLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnertransactionlimit', params, "get")
    return response
  }

  getDetailProductLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnertransactionlimit/' + params, null, "get")
    return response
  }

  getChannelPartnerList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnerinformation', params, "get")
    return response
  }

  getOtpPendingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/otp/lastpending', params, "get", process.env.APIGW_ID_CUSTSER)
    return response
  }

  getPartnerUnbindList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/product/' + params.product_code + '/unbindpartner', params.transaction_code, "get")
    return response
  }

  getPartnerBindingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/product/' + params.product_code + '/bindpartner', params.transaction_code, "get")
    return response
  }

  getActivePartnerBindingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/product/partnertransactionlimit/view', params, "get")
    return response
  }

  updatePartnerLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  deletePartner = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  deleteProductLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  addNewProductLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  submitSpecificLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  submitChangePartnerLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  submitChangeProductLimit = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest/productlimit', params, "post")
    return response
  }

  getPendingList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "get")
    return response
  }

  approveRejectOtpRequest = async (params) => {
    const response = await api.put('api/backoffice/v1/changerequest/otp', params)
    return response
  }

  rejectProductRequest = async (params) => {
    const response = await api.put('api/backoffice/v1/changerequest/productlimit', params)
    return response
  }


  getPartnerChannel = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/partnertransactionlimit', params, "get")
    return response
  }

  processPendingList = async (params) => {
    const response = await ExcuteApi(`api/backoffice/v1/changerequest/${params.id}/confirm`, params, "post")
    return response
  }

}
export default new BusinessParameterSetupApi()
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev


// customer service inquiry
// bussiness parameter setup
// customer service menu
