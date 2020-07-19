import ExcuteApi from './api-integrations/excute-api'

class ProductOnBoardApi {
  getProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/products', params, "get")
    return response
  }

  getProductDetail = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/products/' + params, null, "get")
    return response
  }

  getOptionServiceList = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/services', params, "get")
    return response
  }

  getProductService = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/productservices', params, "get")
    return response
  }

  addNewProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }

  updateProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }

  deleteProduct = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }

  deleteProductService = async (params) => {
    const response = await ExcuteApi('api/backoffice/v1/changerequest', params, "post", process.env.APIGW_ID_CUSTSER)
    return response
  }
}
export default new ProductOnBoardApi()
