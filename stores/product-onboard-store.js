import { observable, action, computed } from "mobx"
import { Modal } from 'antd'
import { create, persist } from 'mobx-persist'
import { ProductOnBoardApi } from '../services'
import productOnboardApi from "../services/product-onboard-api"

const openModalError = ({ title, body }) => {
  Modal.error({
    title: title,
    content: body,
    onOk() {

    },
  });
}
class ProductOnBoard {
  @observable nextPageIsManageProductOnBoard = false
  @observable apiFetching = false
  @observable responseErrorMessage = false

  @observable productList = []
  @observable productSelected = {}
  @observable productDetailSelected = {}

  @observable optionServiceList = []
  @observable productServiceList = []



  @action getDataProductList = async () => {
    this.apiFetching = true
    let tmp = await ProductOnBoardApi.getProduct({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" },
              ]
            }
          ]

        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      this.productList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataProductList',
        body: tmp.data.userMessage,
        code: tmp.data.responseCode
      }
      this.responseApiError = true
    }
  }

  @action getDataProductDetail = async (params) => {
    this.apiFetching = true
    let tmp = await ProductOnBoardApi.getProductDetail(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      this.productDetailSelected = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataProductDetail',
        body: tmp.data.userMessage,
        code: tmp.data.responseCode
      }
      this.responseApiError = true
    }
  }

  @action getDataOptionServiceList = async (params) => {
    this.apiFetching = true
    let tmp = await ProductOnBoardApi.getOptionServiceList(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      this.optionServiceList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataProductDetail',
        body: tmp.data.userMessage,
        code: tmp.data.responseCode
      }
      this.responseApiError = true
    }
  }

  @action getDataProductServiceList = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await productOnboardApi.getProductService({
      filter: {
        where: {
          $and: [{
            product_code: params
          }],
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" },
              ]
            }
          ]

        }
      }
    })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      this.productServiceList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      let errorMessage = {
        title: 'getDataProductServiceList',
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
            <p style={{ fontWeight: 'bold' }}>Error Code {tmp.data.responseCode}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }

  @action submitAddNewProduct = async (params) => {
    this.apiFetching = true
    let tmp = await ProductOnBoardApi.addNewProduct({ change_type: "PRODUCTS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      this.productList = []
      this.apiFetching = false
      this.getDataProductList()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddNewProduct',
        body: tmp.data.userMessage,
        code: tmp.data.responseCode
      }
      this.responseApiError = true
    }
  }

  @action submitGrantService = async (params) => {
    this.apiFetching = true
    let tmp = await ProductOnBoardApi.addNewProduct({ change_type: "PRODUCTS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      let productCode = this.productDetailSelected.product_code
      this.productServiceList = []
      this.apiFetching = false
      this.getDataProductServiceList(productCode)
    } else {
      //when error
      this.apiFetching = false
      let errorMessage = {
        title: 'submitGrantService',
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
            <p style={{ fontWeight: 'bold' }}>Error Code {tmp.data.responseCode}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }

  @action submitDeactivateService = async (params) => {
    this.apiFetching = true
    let tmp = await ProductOnBoardApi.addNewProduct({ change_type: "PRODUCT_SERVICES", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok && tmp.status === 200) {
      //when success
      let productCode = this.productDetailSelected.product_code
      this.productServiceList = []
      this.apiFetching = false
      this.getDataProductServiceList(productCode)
    } else {
      //when error
      this.apiFetching = false
      let errorMessage = {
        title: 'submitDeactivateService',
        body: (
          <div>
            <p>{tmp.data.userMessage}</p>
            <p style={{ fontWeight: 'bold' }}>Error Code {tmp.data.responseCode}</p>
          </div>
        )
      }
      openModalError(errorMessage)
    }
  }


}
export default ProductOnBoard


