// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { BusinessParameterSetupApi } from '../services'
import { create, persist } from 'mobx-persist'

class CustomerServiceEnquiry {
  @observable rowDataObject = null

  @persist @observable persistRow = null

  @action setTmpPendingListID = (data) => {
    this.rowDataObject = data
  }
}
export default CustomerServiceEnquiry
