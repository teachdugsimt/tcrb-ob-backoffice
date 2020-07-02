// src/stores/counter-store.tsx
import { observable, action, computed, toJS } from 'mobx'
import { PendingApprovalApi } from '../services'
import { create, persist } from 'mobx-persist'

class pendingApprovals {
  @observable apiLoading = null

  @observable responseGetPendingApproveList = null
  @observable requestGetPendingApproveList = null
  @observable errorGetPendingApproveList = null

  @observable responseProcessPendingList = null
  @observable requestProcessPendingList = null
  @observable errorProcessPendingList = null
  @observable tmpPendingListID = null

  @observable pendingApprovals = []
  @observable fetchingApi = false



  updatePendingList = () => {
    if (this.tmpPendingListID && this.responseProcessPendingList) {
      let old_id = JSON.parse(JSON.stringify(this.tmpPendingListID))
      let old_list = JSON.parse(JSON.stringify(this.responseGetPendingApproveList))
      old_list.map((e, i) => {
        if (old_id == e.id) {
          old_list.splice(i, 1)
        }
        if (this.responseProcessPendingList.length == 1) {
          this.responseProcessPendingList = []
        }
      })
      this.responseGetPendingApproveList = old_list
    }
  }

  @action setTmpPendingListID = (id) => {
    this.tmpPendingListID = id
  }

  @action processPendingListApprove = async (params) => {
    this.apiLoading = true
    let tmp = await PendingApprovalApi.processPendingList(params)
    console.log("Response process Pending Approve APISAUCE : ", tmp)
    if (tmp.ok) {
      this.apiLoading = false
      this.errorProcessPendingList = null
      this.responseProcessPendingList = tmp.ok
      this.updatePendingList()
      this.tmpPendingListID = null
    } else {
      this.apiLoading = false
      this.responseProcessPendingList = null
      this.errorProcessPendingList = tmp.problem
      this.tmpPendingListID = null
    }
  }

  @action getPendingApprove = async (params) => {
    this.apiLoading = true
    let tmp = await PendingApprovalApi.getPendingApproveList(params)
    console.log("Response get Pending Approve APISAUCE : ", tmp)
    if (tmp.ok == true) {
      let raw_Data = toJS(tmp.data.responseData)
      this.apiLoading = false
      this.errorGetPendingApproveList = null
      this.responseGetPendingApproveList = raw_Data
    } else {
      this.apiLoading = false
      this.responseGetPendingApproveList = null
      this.errorGetPendingApproveList = tmp.problem
    }
  }
}
export default pendingApprovals
