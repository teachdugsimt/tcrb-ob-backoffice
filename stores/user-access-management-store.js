import { observable, action, toJS } from 'mobx'
import { UserAccessManagementApi } from '../services'

export default class UserAccessManagement {
  @observable apiFetching = false
  @observable responseApiError = false

  @observable nextPageIsManageDepartment = null
  @observable nextPageIsManageGroup = null
  @observable nextPageIsManageUser = null
  @observable nextPageIsManageMenuAndFunction = null
  @observable nextPageIsManageRole = null

  @observable departmentList = []


  @observable departmentSelected = null
  @observable groupSelected = null
  @observable userSelected = null

  @action getDataDepartment = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getDepartment({ filter: { where: { status: "ACTIVE" } } })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.departmentList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action getDataDepartmentDetail = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getDepartmentDetail(params)

    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action getDataGroup = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroup(params)

    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action getDataGroupDetail = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroupDetail(params)

    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }
}
