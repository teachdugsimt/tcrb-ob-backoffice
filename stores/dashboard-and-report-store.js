// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { DashboardAndReportApi } from '../services'

class DashboardAndReportStore {
  @observable apiFetching = false
  @observable responseErrorMessage = {}


  @action getDataReportEligible = async (params) => {

    this.apiFetching = true
    let tmp = await DashboardAndReportApi.getReportEligible(params)

    if (tmp.ok && tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataDepartmentDetail',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }
}
export default DashboardAndReportStore
