import { observable, action, toJS } from 'mobx'

export default class BusinessParametersSetupStore {
  @observable pendingApprovals = []

  @action
  selectProductToDelete (productSelected){
    productSelected.ticket = '00000'+this.pendingApprovals.length+1
    productSelected.requestType = productSelected.ProductDescription
    this.pendingApprovals.push(productSelected)
  }
}
